"use client";

import useConversation from "@/app/hooks/useConversations";
import { pusherClient } from "@/app/libs/pusher";
import { FullMessageTypes } from "@/app/types";
import axios from "axios";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";

type BodyProps = {
  initialMessage: FullMessageTypes[];
};

export default function Body({ initialMessage = [] }: BodyProps) {
  const [messages, setMessage] = useState(initialMessage);
  const ref = useRef<HTMLDivElement>(null);
  // console.log(messages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    ref.current?.scrollIntoView();

    const MessageHandler = (message: FullMessageTypes) => {
      axios.post(`/api/conversations/${conversationId}/seen`);
      console.log('new message',message)
      setMessage((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });
      ref.current?.scrollIntoView();
    };

    const updateHandler = (newMessage:FullMessageTypes)=>{

      setMessage(current=>current.map(currentMessage=>{
        if(currentMessage.id === newMessage.id){
          return newMessage;
        }
        return  currentMessage
      }))
    };

    pusherClient.bind("message:new", MessageHandler);
    pusherClient.bind('message:update', updateHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("message:new", MessageHandler);
      pusherClient.unbind('message:update', updateHandler);
    };
  }, [conversationId]);

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
