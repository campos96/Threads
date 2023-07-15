using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.Drawing.Imaging;
using System.Net.Mail;
using System.Net.Mime;
using Threads.Api.Data;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfilePicturesController : ControllerBase
    {
        private readonly ThreadsContext _context;

        public ProfilePicturesController(ThreadsContext context)
        {
            _context = context;
        }

        // GET: api/ProfilePictures/{username}
        [AllowAnonymous]
        [HttpGet("{username}")]
        public async Task<ActionResult> GetProfilePicture(string username)
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

        // GET: api/ProfilePictures/Thumbnail/{username}
        [AllowAnonymous]
        [HttpGet("Thumbnail/{username}")]
        public async Task<ActionResult> GetProfilePictureThumbnail(string username)
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
                var configuration = await _context.Configuration.FirstOrDefaultAsync();
                if (configuration == null || configuration.DefaultProfilePhoto == null)
                {
                    return ApiResult.NotFound();
                }

                return File(configuration.DefaultProfilePhoto, "image/jpeg");
            }

            if (profilePhoto.ThumbnailBytes == null)
            {
                Image thumbnail;

                using (var ms = new MemoryStream(profilePhoto.Bytes))
                {
                    var image = Image.FromStream(ms);
                    thumbnail = image.GetThumbnailImage(50, 50, null, IntPtr.Zero);
                }

                using (var ms = new MemoryStream(profilePhoto.Bytes))
                {
                    thumbnail.Save(ms, ImageFormat.Jpeg);
                    profilePhoto.ThumbnailBytes = ms.ToArray();
                    await _context.SaveChangesAsync();
                }
            }

            return File(profilePhoto.ThumbnailBytes, "image/jpeg");
        }

        // POST: api/ProfilePictures/{accountId}
        [HttpPost("{accountId}")]
        public async Task<ActionResult> PostProfilePicture(Guid accountId, IFormFile photo)
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
                    var profilePhotos = await _context.ProfilePhotos
                        .Where(p => p.AccountId == accountId)
                        .ToListAsync();

                    _context.ProfilePhotos.RemoveRange(profilePhotos);
                    await _context.SaveChangesAsync();

                    var profilePhoto = new ProfilePhoto
                    {
                        AccountId = accountId,
                        FileName = photo.FileName,
                        ContentType = photo.ContentType,
                        Date = DateTime.Now
                    };

                    using (var ms = new MemoryStream())
                    {
                        await photo.CopyToAsync(ms);
                        profilePhoto.Bytes = ms.ToArray();

                        var image = Image.FromStream(ms);
                        var thumbnail = image.GetThumbnailImage(50, 50, null, IntPtr.Zero);
                        thumbnail.Save(ms, ImageFormat.Jpeg);
                        profilePhoto.ThumbnailBytes = ms.ToArray();
                    }

                    _context.ProfilePhotos.Add(profilePhoto);
                    await _context.SaveChangesAsync();
                    await trx.Result.CommitAsync();
                    return ApiResult.Ok();
                }
                catch
                {
                    await trx.Result.RollbackAsync();
                    throw;
                }
            }
        }

        // DELETE: api/ProfilePictures/{accountId}
        [HttpDelete("{accountId}")]
        public async Task<ActionResult> DeleteProfilePicture(Guid accountId)
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
    }
}
