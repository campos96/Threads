using Microsoft.EntityFrameworkCore;
using Threads.Core.Models;

namespace Threads.Api.Data
{
    public class ThreadsContext : DbContext
    {
        public ThreadsContext(DbContextOptions<ThreadsContext> options) : base(options)
        {

        }

        public DbSet<Threads.Core.Models.Account> Accounts { get; set; }

        public DbSet<Threads.Core.Models.Security> Security { get; set; }

        public DbSet<Threads.Core.Models.Profile> Profiles { get; set; }

        public DbSet<Threads.Core.Models.Follower> Followers { get; set; }

        public DbSet<Threads.Core.Models.Thread> Threads { get; set; }

        public DbSet<Threads.Core.Models.ThreadAttachment> ThreadAttachments { get; set; }

        public DbSet<Threads.Core.Models.Configuration> Configuration { get; set; }

    }
}
