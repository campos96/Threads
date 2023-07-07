
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Threads.Api.Data;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
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
                .Include(t=> t.Attachments)
                .Include(t=> t.RepostedThread)
                .Include(t=> t.RepliedThread)
                .Include(t=> t.QuotedThread)
                .Include(t => t.Account)
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
                .Include(t => t.Attachments)
                .Include(t => t.RepostedThread)
                .Include(t => t.RepliedThread)
                .Include(t => t.QuotedThread)
                .Include(t => t.Account)
                .Where(t => t.Id == id)
                .FirstOrDefaultAsync();

            if (thread == null)
            {
                return ApiResult.NotFound();
            }

            return ApiResult.Ok(payload: thread);
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
