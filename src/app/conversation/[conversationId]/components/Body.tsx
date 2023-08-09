"use client";

import { FullMessageTypes } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import useConversation from "@/app/hooks/useConversations";

type BodyProps = {
  initialMessage: FullMessageTypes[];
};

export default function Body({ initialMessage = [] }: BodyProps) {
  const [messages, setMessage] = useState(initialMessage);
  const ref = useRef<HTMLDivElement>(null);
  // console.log(messages);

  const {conversationId} = useConversation();

  useEffect(()=>{
    axios.post(`/api/conversations/${conversationId}/seen`)
  },[conversationId])


  return (
    <div className="flex-1 overflow-y-auto">
      <div>
        {messages.map((message, i) => (
          <MessageBox
            key={message.id}
            isLast={i === messages.length - 1}
            data={message}
          />
        ))}
      </div>
      <div ref={ref} className="pt-20" />
    </div>
  );
}
