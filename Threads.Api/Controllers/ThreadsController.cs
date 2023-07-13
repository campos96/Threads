
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Threads.Api.Data;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadsController : ControllerBase
    {
        private readonly ThreadsContext _context;

        public ThreadsController(ThreadsContext context)
        {
            _context = context;
        }

        // GET: api/Threads
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Core.Models.Thread>>> GetThreads()
        {
            if (_context.Threads == null)
            {
                return ApiResult.NotFound();
            }

            var threads = await _context.Threads
                .OrderByDescending(t => t.Created)
                .ToListAsync();

            return ApiResult.Ok(payload: threads);
        }

        // GET: api/Threads/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Core.Models.Thread>> GetThread(Guid id)
        {
            if (_context.Threads == null)
            {
                return ApiResult.NotFound();
            }
            var thread = await _context.Threads
                .Include(t => t.Account)
                .Include(t => t.Attachments)
                .Include(t => t.RepostedThread)
                .Include(t => t.RepliedThread)
                .Include(t => t.QuotedThread)
                .Where(t => t.Id == id)
                .FirstOrDefaultAsync();

            if (thread == null)
            {
                return ApiResult.NotFound();
            }

            thread.Replies = await _context.Threads
                    .Where(t => t.RepliedThreadId == thread.Id)
                    .CountAsync();

            thread.Likes = await _context.ThreadLikes
                    .Where(t => t.ThreadId == thread.Id)
                    .CountAsync();

            return ApiResult.Ok(payload: thread);
        }

        // GET: api/Threads/Repliers/5
        [HttpGet("Repliers/{threadId}")]
        public async Task<ActionResult<Account>> GetThreadRepliers(Guid threadId)
        {
            if (threadId == Guid.Empty)
            {
                return ApiResult.BadRequest();
            }

            var repliers = await _context.Threads
                .Include(t => t.Account)
                .Where(t => t.RepliedThreadId == threadId)
                .OrderByDescending(t => t.Created)
                .Select(t => t.Account)
                .ToListAsync();

            return ApiResult.Ok(payload: repliers);
        }

        // PUT: api/Threads/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutThread(Guid id, Core.Models.Thread thread)
        {
            if (id != thread.Id)
            {
                return ApiResult.BadRequest();
            }

            _context.Entry(thread).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return ApiResult.Ok();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThreadExists(id))
                {
                    return ApiResult.NotFound();
                }
                throw;
            }
        }

        // POST: api/Threads
        [HttpPost]
        public async Task<ActionResult<Core.Models.Thread>> PostThread(Core.Models.Thread thread)
        {
            if (_context.Threads == null)
            {
                return Problem("Entity set 'ThreadsContext.Threads'  is null.");
            }

            thread.Created = DateTime.Now;
            _context.Threads.Add(thread);
            await _context.SaveChangesAsync();
            return ApiResult.Ok(payload: thread);
        }

        // DELETE: api/Threads/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteThread(Guid id)
        {
            if (_context.Threads == null)
            {
                return ApiResult.NotFound();
            }
            var thread = await _context.Threads.FindAsync(id);
            if (thread == null)
            {
                return ApiResult.NotFound();
            }

            _context.Threads.Remove(thread);
            await _context.SaveChangesAsync();
            return ApiResult.Ok();
        }

        private bool ThreadExists(Guid id)
        {
            return (_context.Threads?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
