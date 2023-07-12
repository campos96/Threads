using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Threads.Core.Models
{
    public class ThreadLike
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ThreadId { get; set; }

        [Required]
        public Guid AccountId { get; set; }

        [ForeignKey(nameof(ThreadId))]
        public Thread? Thread { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Account? Account { get; set; }
    }
}
