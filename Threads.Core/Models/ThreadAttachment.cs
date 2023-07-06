using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Threads.Core.Models
{
    public enum AttachmentType
    {
        Image = 0, Video = 1
    }

    public class ThreadAttachment
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid ThreadId { get; set; }

        [Required]
        public AttachmentType Type { get; set; }

        [Required]
        public byte[] Data { get; set; }

        [ForeignKey(nameof(ThreadId))]
        public Thread? Thread { get; set; }
    }
}
