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
    public class FollowersController : ControllerBase
    {
        private readonly ThreadsContext _context;

        public FollowersController(ThreadsContext context)
        {
            _context = context;
        }

        // GET: api/Followers/5
        [HttpGet("{accountId}")]
        public async Task<ActionResult<List<Follower>>> GetFollowers(Guid accountId)
        {
            if (_context.Followers == null)
            {
                return ApiResult.NotFound();
            }

            var followers = await _context.Followers
                .Include(f => f.FollowerAccount)
                .Where(f => f.AccountId == accountId)
                .ToListAsync();

            return ApiResult.Ok(payload: followers);
        }

        // DELETE: api/Followers/5
        [HttpDelete("{accountId}/{followerId}")]
        public async Task<IActionResult> DeleteFollower(Guid accountId, Guid followerId)
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
