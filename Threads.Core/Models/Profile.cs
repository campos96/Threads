using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Threads.Core.Models
{
    public class Profile
    {
        [Key]
        public Guid AccountId { get; set; }

        public string? DisplayName { get; set; }

        public string? Biography { get; set; }

        public string? Link { get; set; }

        public bool IsPrivate { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Account? Account { get; set; }
    }
}
