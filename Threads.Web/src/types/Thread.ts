import Account from "./Account";
import Attachment from "./Attachment";

type Thread = {
  id: string;
  accountId: string;
  created: Date;
  type: number;
  reply: number;
  replies: number,
  likes: number,
  attachments: Array<Attachment>;

  description?: string;
  repostedThreadId?: string;
  repliedThreadId?: string;
  quotedThreadId?: string;

  account?: Account;
  repostedThread?: Thread;
  repliedThread?: Thread;
  quotedThread?: Thread;
};

export default Thread;
