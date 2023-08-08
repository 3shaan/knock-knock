"use client";
import useConversation from "@/app/hooks/useConversations";
import { FullConversationType } from "@/app/types";
import ConversationBox from "@/app/conversation/components/ConversationBox";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {MdOutlineGroupAdd} from 'react-icons/md'

type Props = {
  initialItems: FullConversationType[];
};

export default function ConversationList({ initialItems }: Props) {
  const [items, setItems] = useState(initialItems);
  const router = useRouter();
  const { conversationId } = useConversation();
  return (
    <div
      className="
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

    "
    >
      <div className="
      flex
      justify-between
      items-center
      pt-3
      ">
        <div className="
        text-2xl
        font-semibold
        text-gray-700
        ">
            <p>Message</p>
        </div>
        <div className="
        text-2xl
        text-gray-600
        hover:text-gray-400
        pr-5
        ">
            <MdOutlineGroupAdd/>
        </div>
      </div>
      {
        items.map(item=>(
            <ConversationBox 
            key={item.id}
            data={item}
            selected={conversationId === item.id}
            />
        ))
      }
    </div>
  );
}
