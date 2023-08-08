import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { getConversation } from "../Action/getConversations";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
    const conversations  = await getConversation();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations}/>
        {children}
        </div>
    </Sidebar>
  );
}
