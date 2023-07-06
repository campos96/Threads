using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Threads.Core.Models
{
    [PrimaryKey(nameof(AccountId), nameof(FollowerAccountId))]
    public class Follower
    {
        [Required]
        public Guid AccountId { get; set; }

        [Required]
        public Guid FollowerAccountId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Account? Account { get; set; }

        [ForeignKey(nameof(FollowerAccountId))]
        public Account? FollowerAccount { get; set; }
    }
}
