using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace Threads.Core.Models
{
    [Index(nameof(Username), IsUnique = true)]
    [Index(nameof(Email), IsUnique = true)]
    public class Account
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Name { get; set; }

        public string? Phone { get; set; }

        public string? Gender { get; set; }

        public DateTime? Birthday { get; set; }

        public DateTime? Created { get; set; }
    }
}
