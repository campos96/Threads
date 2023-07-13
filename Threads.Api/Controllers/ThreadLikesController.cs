using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using Threads.Api.Data;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ThreadLikesController : ControllerBase
    {
        private readonly ThreadsContext _context;

        public ThreadLikesController (ThreadsContext context)
        {
            _context = context;
        }

        [HttpGet("{threadId}/{accountId}")]
        public async Task<ActionResult> GetThreadLike(Guid threadId, Guid accountId)
        {
            var threadLikeExist = await _context.ThreadLikes
                .Where(l => l.ThreadId == threadId && l.AccountId == accountId)
                .AnyAsync();

            if (!threadLikeExist)
            {
                return ApiResult.NotFound();
            }

            return ApiResult.Ok();
        }

        [HttpPost]
        public async Task<ActionResult> PostThreadLike(ThreadLike threadLike)
        {
            var currentThreadLike = await _context.ThreadLikes
                .Where(l => l.ThreadId == threadLike.ThreadId && l.AccountId == threadLike.AccountId)
                .FirstOrDefaultAsync();

            if (currentThreadLike != null)
            {
                _context.ThreadLikes.Remove(currentThreadLike);
                await _context.SaveChangesAsync();
                return ApiResult.Ok();
            }

            _context.ThreadLikes.Add(threadLike);
            await _context.SaveChangesAsync();
            return ApiResult.Ok();
        }
    }
}
