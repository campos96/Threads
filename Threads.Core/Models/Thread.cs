using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Threads.Core.Models
{
    public enum ThreadType
    {
        Thread = 0, Repost = 1, Reply = 2, Quote = 3
    }

    public enum ReplyType
    {
        Anyone = 0, Followers = 1, Following = 2, Mentioned = 3
    }

    public class Thread
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public Guid AccountId { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public ThreadType Type { get; set; }

        [Required]
        public ReplyType Reply { get; set; }

        public string? Description { get; set; }

        public Guid? RepostedThreadId { get; set; }

        public Guid? RepliedThreadId { get; set; }

        public Guid? QuotedThreadId { get; set; }

        [ForeignKey(nameof(AccountId))]
        public Account? Account { get; set; }

        [ForeignKey(nameof(RepostedThreadId))]
        public Thread? RepostedThread { get; set; }

        [ForeignKey(nameof(RepliedThreadId))]
        public Thread? RepliedThread { get; set; }

        [ForeignKey(nameof(QuotedThreadId))]
        public Thread? QuotedThread { get; set; }

        public virtual ICollection<ThreadAttachment>? Attachments { get; set; }
    }
}
