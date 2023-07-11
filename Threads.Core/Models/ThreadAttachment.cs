using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Threads.Core.Models
{
    public class ThreadAttachment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ThreadId { get; set; }

        [Required]
        public string ContentType { get; set; }

        [Required]
        public byte[] Bytes { get; set; }

        [Required]
        public string FileName { get; set; }

        [ForeignKey(nameof(ThreadId))]
        public Thread? Thread { get; set; }
    }
}
