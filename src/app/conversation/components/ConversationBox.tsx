"use client";
import Avatar from "@/app/components/Avatar";
import useOtherUsers from "@/app/hooks/useOtherUser";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type ConversationBoxProps = {
  data: FullConversationType;
  selected?: boolean;
};

export default function ConversationBox({
  data,
  selected,
}: ConversationBoxProps) {
  const otherUsers = useOtherUsers(data);
  const router = useRouter();
  const session = useSession();

  const handleClick = useCallback(() => {
    router.push(`/conversation/${data.id}`);
  }, [router, data]);

  const lastMessage = useMemo(() => {
    const message = data.messages || [];
    return message[message.length - 1];
  }, [data.messages]);

  const userEmail = useMemo(
    () => session.data?.user?.email,
    [session.data?.user?.email]
  );

  const hasSeen = useMemo(() => {
    if (!lastMessage) {
      return false;
    }

    const seenArray = lastMessage.seen || [];
    if (!userEmail) {
      return false;
    }
    return seenArray.filter((seen) => seen.email === userEmail).length !== 0;
  }, [userEmail, lastMessage]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Send an Images";
    }

    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Start a Conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        `
    w-full 
    relative 
    flex 
    items-center 
    space-x-3 
    p-3 
    hover:bg-neutral-100
    rounded-lg
    transition
    cursor-pointer
    `,
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      <div>
        <Avatar user={otherUsers} />
      </div>
      <div className="w-full">
        <div
          className="
      flex 
      justify-between
      "
        >
          <p>{data.name || otherUsers.name}</p>
          {lastMessage?.CreateAt && (
            <p
              className="
            text-gray-400
            text-xs
            
            "
            >
              {format(new Date(lastMessage?.CreateAt), "p")}
            </p>
          )}
        </div>
        <p 
            className={clsx(`
              truncate 
              text-sm
              `,
              hasSeen ? 'text-gray-500' : 'text-black font-medium'
            )}>
              {lastMessageText}
            </p>
      </div>
    </div>
  );
}
