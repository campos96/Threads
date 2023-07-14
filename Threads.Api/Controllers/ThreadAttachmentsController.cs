using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using Threads.Api.Data;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadAttachmentsController : ControllerBase
    {
        private readonly ThreadsContext _context;

        public ThreadAttachmentsController(ThreadsContext context)
        {
            _context = context;
        }

        // GET: api/ThreadAttachments/{id}
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetAttachment(Guid id)
        {
            if (id == Guid.Empty)
            {
                return ApiResult.BadRequest();
            }

            var attachment = await _context.ThreadAttachments
                .Where(p => p.Id == id)
                .FirstOrDefaultAsync();

            if (attachment == null)
            {
                return ApiResult.NotFound();
            }

            if (attachment.Width == null || attachment.Height == null)
            {
                using (var ms = new MemoryStream(attachment.Bytes))
                {
                    var image = Image.FromStream(ms);
                    attachment.Width = image.Width;
                    attachment.Height = image.Height;
                    await _context.SaveChangesAsync();
                }
            }

            return File(attachment.Bytes, attachment.ContentType);
        }


        // POST: api/ThreadAttachments/{threadId}
        [HttpPost("{threadId}")]
        public async Task<ActionResult> PostAttachment(Guid threadId, IFormFile picture)
        {
            if (threadId == Guid.Empty || picture == null)
            {
                return ApiResult.BadRequest();
            }

            var thread = await _context.Threads.FindAsync(threadId);
            if (thread == null)
            {
                return ApiResult.BadRequest();
            }

            using (var ms = new MemoryStream())
            {
                await picture.CopyToAsync(ms);

                var image = Image.FromStream(ms);

                var threadAttachment = new ThreadAttachment
                {
                    Id = Guid.NewGuid(),
                    ThreadId = thread.Id,
                    FileName = picture.FileName,
                    Bytes = ms.ToArray(),
                    ContentType = picture.ContentType,
                    Width = image.Width,
                    Height = image.Height,
                };

                _context.ThreadAttachments.Add(threadAttachment);
                await _context.SaveChangesAsync();
                return ApiResult.Ok();
            }
        }
    }
}
