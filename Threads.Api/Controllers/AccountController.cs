using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Threads.Api.Data;
using Threads.Api.Models;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ThreadsContext _context;
        private readonly IConfiguration _config;

        public AccountController(ThreadsContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // GET api/account/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> GetAccount(Guid id)
        {
            if (id == Guid.Empty)
            {
                return ApiResult.BadRequest();
            }

            var account = await _context.Accounts.FindAsync(id);
            if (account == null)
            {
                return ApiResult.NotFound();
            }

            return ApiResult.Ok(payload: account);
        }

        // POST: api/account/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login(Login login)
        {
            if (!ModelState.IsValid)
            {
                return ApiResult.BadRequest();
            }

            var security = await _context.Security
                .Include(s => s.Account)
                .Where(s => s.Account!.Username == login.Username && s.Password == login.Password)
                .FirstOrDefaultAsync();

            if (security == null)
            {
                return ApiResult.Unauthorized(errors: new
                {
                    Username = new[] { "Invalid username or password." }
                });
            }

            var issuer = _config.GetValue<string>("Jwt:Issuer");
            var audience = _config.GetValue<string>("Jwt:Audience");
            var key = Encoding.ASCII.GetBytes(_config.GetValue<string>("Jwt:Key")!);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.UniqueName, security.AccountId.ToString()),
                    new Claim(JwtRegisteredClaimNames.NameId, security.Account!.Username),
                    new Claim(JwtRegisteredClaimNames.Email, security.Account.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                 }),
                Expires = DateTime.UtcNow.AddDays(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);

            var authenticationResult = new
            {
                AccessToken = stringToken,
                ExpiresIn = (int)(tokenDescriptor.Expires.Value - DateTime.UtcNow).TotalSeconds,
                AccountId = security.AccountId,
            };

            return ApiResult.Ok(payload: authenticationResult);
        }

        // POST: api/account/signup
        [AllowAnonymous]
        [HttpPost("signup")]
        public async Task<ActionResult> Signup(Signup signup)
        {
            if (!ModelState.IsValid)
            {
                return ApiResult.BadRequest();
            }

            var account = await _context.Accounts
                .Where(a => a.Username == signup.Username || a.Email == signup.Email)
                .FirstOrDefaultAsync();

            if (account != null)
            {
                if (account.Username == signup.Username)
                {
                    return ApiResult.BadRequest(errors: new
                    {
                        Username = new[] { "Username already exist." }
                    });
                }
                else if (account.Email == signup.Email)
                {
                    return ApiResult.BadRequest(errors: new
                    {
                        Email = new[] { "Email already exist." }
                    });
                }
            }

            using (var trx = _context.Database.BeginTransactionAsync())
            {
                try
                {
                    account = new Account
                    {
                        Id = Guid.NewGuid(),
                        Name = signup.Name,
                        LastName = signup.LastName,
                        Username = signup.Username,
                        Email = signup.Email,
                        Created = DateTime.Now
                    };
                    _context.Accounts.Add(account);
                    await _context.SaveChangesAsync();

                    var security = new Security { AccountId = account.Id, Password = signup.Password, };
                    _context.Security.Add(security);
                    await _context.SaveChangesAsync();

                    var profile = new Profile { AccountId = account.Id };
                    _context.Profiles.Add(profile);
                    await _context.SaveChangesAsync();
                    await trx.Result.CommitAsync();
                }
                catch
                {
                    await trx.Result.RollbackAsync();
                    //log error
                }
            }

            return ApiResult.Ok();
        }
    }
}
