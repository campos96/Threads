using System.ComponentModel.DataAnnotations;

namespace Threads.Api.Models
{
    public class AccountProfile
    {
        [Key]
        public Guid AccountId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public bool IsPrivate { get; set; }

        public string? Username { get; set; }

        public string? Email { get; set; }

        public string? Phone { get; set; }

        public string? Gender { get; set; }

        public DateTime? Birthday { get; set; }

        public string? DisplayName { get; set; }

        public string? Biography { get; set; }

        public string? Link { get; set; }

    }
}
