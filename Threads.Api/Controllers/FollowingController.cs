using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Threads.Api.Data;
using Threads.Core.Models;

namespace Threads.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FollowingController : ControllerBase
    {
        private readonly ThreadsContext _context;

        public FollowingController(ThreadsContext context)
        {
            _context = context;
        }

        // GET: api/Following/5
        [HttpGet("{accountId}")]
        public async Task<ActionResult<List<Follower>>> GetFollowing(Guid accountId)
        {
            if (_context.Followers == null)
            {
                return ApiResult.NotFound();
            }
            var following = await _context.Followers
                .Include(f => f.Account)
                .Where(f => f.FollowerAccountId == accountId)
                .ToListAsync();

            if (following == null)
            {
                return ApiResult.NotFound();
            }

            return ApiResult.Ok(payload: following);
        }

        // POST: api/Following
        [HttpPost]
        public async Task<ActionResult<Follower>> PostFollowing(Follower follower)
        {
            if (_context.Followers == null)
            {
                return Problem("Entity set 'ThreadsContext.Followers'  is null.");
            }

            follower.Date = DateTime.Now;
            _context.Followers.Add(follower);

            try
            {
                await _context.SaveChangesAsync();
                return ApiResult.Ok();
            }
            catch (DbUpdateException)
            {
                if (FollowerExists(follower.AccountId))
                {
                    return Conflict();
                }
                throw;
            }
        }

        // DELETE: api/Following/5
        [HttpDelete("{followerId}/{accountId}")]
        public async Task<IActionResult> DeleteFollowing(Guid followerId, Guid accountId)
        {
            if (_context.Followers == null)
            {
                return ApiResult.NotFound();
            }
            var follower = await _context.Followers
                .Where(f => f.AccountId == accountId && f.FollowerAccountId == followerId)
                .FirstOrDefaultAsync();

            if (follower == null)
            {
                return ApiResult.NotFound();
            }

            _context.Followers.Remove(follower);
            await _context.SaveChangesAsync();

            return ApiResult.Ok();
        }

        private bool FollowerExists(Guid id)
        {
            return (_context.Followers?.Any(e => e.AccountId == id)).GetValueOrDefault();
        }
    }
}
