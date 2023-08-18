"use client";
import useConversation from "@/app/hooks/useConversations";
import { pusherClient } from "@/app/libs/pusher";
import { FullConversationType } from "@/app/types";
import { User } from "@prisma/client";
import clsx from "clsx";
import { find } from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupMessageModal from "./GroupMessageModal";

type Props = {
  initialItems: FullConversationType[];
  users: User[] | null;
};

export default function ConversationList({ initialItems, users }: Props) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setModalOpen] = useState(false);
  const session = useSession();

  const userEmail = useMemo(() => {
    return session.data?.user?.email;
  }, [session.data?.user?.email]);

  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  useEffect(() => {
    if (!userEmail) {
      return;
    }
    pusherClient.subscribe(userEmail);

    const updateConversation = (conversations: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversations.id })) {
          return current;
        }
        return [conversations, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const deleteHandler = (conversation: FullConversationType) => {
      setItems((current) =>
        current.filter((con) => con.id !== conversation.id)
      );

      if (conversationId === conversation.id) {
        router.push("/conversation");
      }
    };
    pusherClient.bind("conversation:new", updateConversation);
    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:remove", deleteHandler);

    return () => {
      pusherClient.unsubscribe(userEmail);
      pusherClient.unbind("conversation:new", updateConversation);
      pusherClient.unbind("conversation:update", updateHandler);
      pusherClient.unbind("conversation:remove", deleteHandler);
    };
  }, [userEmail, conversationId, router]);
  return (
    <>
      <GroupMessageModal
        users={users!}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div
        className={clsx(
          `
      fixed
      inset-y-0
      md:pl-24
      lg:pl-0
      lg:pb-0
      lg:left-20
      md:w-80
      overflow-y-auto
      border-r
      border-gray-200
      block
      w-full
      left-0

`,
          isOpen ? "hidden md:block" : "block"
        )}
      >
        <div
          className="
      flex
      justify-between
      items-center
      pt-3
      "
        >
          <div
            className="
        text-2xl
        font-semibold
        text-gray-700
        "
          >
            <p>Message</p>
          </div>
          <div
            onClick={() => setModalOpen(true)}
            className="
        text-2xl
        text-gray-600
        hover:text-gray-400
        pr-5
        "
          >
            <MdOutlineGroupAdd />
          </div>
        </div>
        {items.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={conversationId === item.id}
          />
        ))}
      </div>
    </>
  );
}
