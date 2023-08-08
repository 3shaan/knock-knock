import { Conversation, Message, User } from "prisma/prisma-client";

export type FullMessageTypes = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageTypes[];
};
