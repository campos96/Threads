using System.ComponentModel.DataAnnotations;

namespace Threads.Core.Models
{
    public class Configuration
    {
        [Key]
        public Guid Id { get; set; }

        public byte[]? DefaultProfilePhoto { get; set; }

    }
}
