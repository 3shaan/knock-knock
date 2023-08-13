"use client";
import useConversation from "@/app/hooks/useConversations";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupMessageModal from "./GroupMessageModal";
import { User } from "@prisma/client";

type Props = {
  initialItems: FullConversationType[];
  users:User[] | null
};

export default function ConversationList({ initialItems , users}: Props) {
  const [items, setItems] = useState(initialItems);
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const { conversationId, isOpen } = useConversation();
  return (
    <>
    <GroupMessageModal
    users={users!}
    isOpen={isModalOpen}
    onClose={()=>setModalOpen(false)}
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
        onClick={()=>setModalOpen(true)}
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
