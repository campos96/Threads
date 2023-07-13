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


        // GET: api/profiles/photo/{username}
        [AllowAnonymous]
        [HttpGet("photo/{username}")]
        public async Task<ActionResult> GetPhoto(string username)
        {
            if (username == string.Empty)
            {
                return ApiResult.BadRequest();
            }

            var profilePhoto = await _context.ProfilePhotos
                .Include(p => p.Account)
                .Where(p => p.Account.Username == username)
                .FirstOrDefaultAsync();

            if (profilePhoto == null)
            {
                var defaultPhoto = await _context.Configuration.FirstOrDefaultAsync();
                if (defaultPhoto == null || defaultPhoto.DefaultProfilePhoto == null)
                {
                    return ApiResult.NotFound();
                }

                return File(defaultPhoto.DefaultProfilePhoto, "image/jpge");
            }

            return File(profilePhoto.Bytes, profilePhoto.ContentType);
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

        // PUT: api/Profiles/username
        [HttpGet("threads/{username}")]
        public async Task<ActionResult<IEnumerable<Core.Models.Thread>>> GetThreads(string username)
        {
            if (_context.Threads == null)
            {
                return ApiResult.NotFound();
            }

            var threads = await _context.Threads
                .Where(t => t.Account!.Username == username)
                .OrderByDescending(t => t.Created)
                .ToListAsync();

            return ApiResult.Ok(payload: threads);
        }

        // POST: api/profiles/photo/{accountId}
        [HttpPost("photo/{accountId}")]

        public async Task<ActionResult> SetPhoto(Guid accountId, IFormFile photo)
        {
            if (accountId == Guid.Empty || photo == null)
            {
                return ApiResult.BadRequest();
            }

            var profile = await _context.Profiles.FindAsync(accountId);
            if (profile == null)
            {
                return ApiResult.BadRequest();
            }
            using (var trx = _context.Database.BeginTransactionAsync())
            {
                try
                {
                    using (var ms = new MemoryStream())
                    {
                        var profilePhotos = await _context.ProfilePhotos
                            .Where(p => p.AccountId == accountId)
                            .ToListAsync();
                        _context.ProfilePhotos.RemoveRange(profilePhotos);
                        await _context.SaveChangesAsync();

                        await photo.CopyToAsync(ms);

                        var profilePhoto = new ProfilePhoto
                        {
                            AccountId = accountId,
                            FileName = photo.FileName,
                            ContentType = photo.ContentType,
                            Bytes = ms.ToArray(),
                            Date = DateTime.Now
                        };

                        _context.ProfilePhotos.Add(profilePhoto);
                        await _context.SaveChangesAsync();
                        await trx.Result.CommitAsync();
                        return ApiResult.Ok();
                    }
                }
                catch
                {
                    await trx.Result.RollbackAsync();
                    throw;
                }
            }
        }

        // DELETE: api/profiles/photo/{accountId}
        [HttpDelete("photo/{accountId}")]
        public async Task<ActionResult> DeletePhotos(Guid accountId)
        {
            if (accountId == Guid.Empty)
            {
                return ApiResult.BadRequest();
            }

            var profilePhoto = await _context.ProfilePhotos
                .Where(p => p.AccountId == accountId)
                .ToListAsync();

            _context.ProfilePhotos.RemoveRange(profilePhoto);
            await _context.SaveChangesAsync();
            return ApiResult.Ok();
        }

        private bool ProfileExists(Guid id)
        {
            return (_context.Profiles?.Any(e => e.AccountId == id)).GetValueOrDefault();
        }
    }
}
