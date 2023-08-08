import {Message, User, Conversation} from 'prisma/prisma-client'

export type FullMessageTypes = Message & {
    sender: User;
    seen:User[];
};

export type FullConversationType = Conversation & {
    user:User[];
    messages : FullMessageTypes[];
}