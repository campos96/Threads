using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Threads.Core.Models
{
    public class Security
    {
        [Key]
        public Guid AccountId { get; set; }
        
        [Required]
        public string Password { get; set; }
    
        public Guid? PasswordResetToken { get; set; }

        public DateTime? PasswordResetExpiration { get; set; }

        public DateTime? LastPasswordReset { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Account? Account { get; set; }
    }
}
