﻿using System;
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

        private bool ProfileExists(Guid id)
        {
            return (_context.Profiles?.Any(e => e.AccountId == id)).GetValueOrDefault();
        }
    }
}
