using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Threads.Api.Data;
using Threads.Api.Models;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilesController : ControllerBase
    {
        private readonly ThreadsContext _context;

        public ProfilesController(ThreadsContext context)
        {
            _context = context;
        }

        // GET: api/Profiles/accountId
        [HttpGet("{accountId}")]
        public async Task<ActionResult<Profile>> GetProfileById(Guid accountId)
        {
            if (_context.Profiles == null)
            {
                return ApiResult.NotFound();
            }

            var profile = await _context.Profiles
                .Include(p => p.Account)
                .Where(p => p.AccountId == accountId)
                .FirstOrDefaultAsync();

            if (profile == null)
            {
                return ApiResult.NotFound();
            }

            return ApiResult.Ok(payload: profile);
        }

        // GET: api/Profiles/{username}
        [HttpGet("username/{username}")]
        public async Task<ActionResult<Profile>> GetProfileByUsername(string username)
        {
            if (_context.Profiles == null)
            {
                return ApiResult.NotFound();
            }

            var profile = await _context.Profiles
                .Include(p => p.Account)
                .Where(p => p.Account!.Username == username)
                .FirstOrDefaultAsync();

            if (profile == null)
            {
                return ApiResult.NotFound();
            }

            return ApiResult.Ok(payload: profile);
        }

        // GET: api/profiles/account/{id}
        [HttpGet("account/{id}")]
        public async Task<ActionResult<AccountProfile>> GetAccountProfile(Guid id)
        {
            if (id == Guid.Empty)
            {
                return ApiResult.BadRequest();
            }

            var profile = await _context.Profiles
                .Include(a => a.Account)
                .Where(a => a.AccountId == id)
                .FirstOrDefaultAsync();

            if (profile == null)
            {
                return ApiResult.NotFound();
            }

            var accountProfile = new AccountProfile
            {
                AccountId = profile.AccountId,
                Username = profile.Account.Username,
                Name = profile.Account.Name,
                LastName = profile.Account.LastName,
                DisplayName = profile.DisplayName,
                Email = profile.Account.Email,
                IsPrivate = profile.IsPrivate,
                Biography = profile.Biography,
                Birthday = profile.Account.Birthday,
                Gender = profile.Account.Gender,
                Phone = profile.Account.Phone,
                Link = profile.Link
            };

            return ApiResult.Ok(payload: accountProfile);
        }

        // PUT: api/profiles/account/{id}
        [HttpPut("account/{id}")]
        public async Task<ActionResult<AccountProfile>> PutAccountProfile(Guid id, AccountProfile accountProfile)
        {
            if (id != accountProfile.AccountId)
            {
                return ApiResult.BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return ApiResult.BadRequest();
            }

            var profile = await _context.Profiles
                .Include(p => p.Account)
                .Where(p => p.AccountId == id)
                .FirstOrDefaultAsync();

            if (profile == null)
            {
                return ApiResult.BadRequest();
            }

            using (var trx = _context.Database.BeginTransactionAsync())
            {
                try
                {
                    profile.Account.Name = accountProfile.Name;
                    profile.Account.LastName = accountProfile.LastName;
                    profile.Account.Birthday = accountProfile.Birthday;
                    profile.Account.Gender = accountProfile.Gender;
                    profile.Account.Phone = accountProfile.Phone;
                    profile.IsPrivate = accountProfile.IsPrivate;
                    profile.DisplayName = accountProfile.DisplayName;
                    profile.Biography = accountProfile.Biography;
                    profile.Link = accountProfile.Link;
                    await _context.SaveChangesAsync();
                    await trx.Result.CommitAsync();
                }
                catch
                {
                    await trx.Result.RollbackAsync();
                    throw;
                }
            }

            return ApiResult.Ok(payload: accountProfile);
        }

        // PUT: api/Profiles/accountId
        [HttpPut("{accountId}")]
        public async Task<IActionResult> PutProfile(Guid accountId, Profile profile)
        {
            if (accountId != profile.AccountId)
            {
                return ApiResult.BadRequest();
            }

            _context.Entry(profile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return ApiResult.Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfileExists(accountId))
                {
                    return ApiResult.NotFound();
                }
                throw;
            }
        }

        // PUT: api/Profiles/Threads/username
        [HttpGet("Threads/{username}")]
        public async Task<ActionResult<IEnumerable<Core.Models.Thread>>> GetThreads(string username)
        {
            if (_context.Threads == null)
            {
                return ApiResult.NotFound();
            }

            var threads = await _context.Threads
                .Where(t => t.Account!.Username == username && t.RepliedThreadId == null)
                .OrderByDescending(t => t.Created)
                .ToListAsync();

            return ApiResult.Ok(payload: threads);
        }


        // PUT: api/Profiles/Replies/username
        [HttpGet("Replies/{username}")]
        public async Task<ActionResult<IEnumerable<Core.Models.Thread>>> GetReplies(string username)
        {
            if (_context.Threads == null)
            {
                return ApiResult.NotFound();
            }

            var threads = await _context.Threads
                .Where(t => t.Account!.Username == username && t.RepliedThreadId != null)
                .OrderByDescending(t => t.Created)
                .ToListAsync();

            return ApiResult.Ok(payload: threads);
        }

        private bool ProfileExists(Guid id)
        {
            return (_context.Profiles?.Any(e => e.AccountId == id)).GetValueOrDefault();
        }
    }
}
