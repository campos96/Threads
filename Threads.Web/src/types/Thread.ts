import Account from "./Account";
import Attachment from "./Attachment";

export type Thread = {
  id: string;
  accountId: string;
  created: Date;
  type: ThreadType;
  reply: ThreadReply;
  replies: number;
  likes: number;
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

export enum ThreadType {
  Thread = 0,
  Repost = 1,
  Reply = 2,
  Quote = 3,
}

export enum ThreadReply {
  Anyone = 0,
  Followers = 1,
  Following = 2,
  Mentioned = 3,
}
