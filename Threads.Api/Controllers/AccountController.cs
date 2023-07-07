using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Threads.Api.Data;
using Threads.Api.Models;

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

        // POST: api/account/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult> Login(Login login)
        {
            if (_context.Accounts == null)
            {
                return NotFound();
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
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = tokenHandler.WriteToken(token);
            var stringToken = tokenHandler.WriteToken(token);

            var authenticationResult = new
            {
                AccessToken = stringToken,
                ExpiresIn = (int)(tokenDescriptor.Expires.Value - DateTime.UtcNow).TotalSeconds,
                UserFullName = security.Account!.Name,
                AccountId = security.AccountId,
            };

            return ApiResult.Ok(payload: authenticationResult);
        }
    }
}
