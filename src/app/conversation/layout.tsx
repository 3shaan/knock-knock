import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";
import { getConversation } from "../Action/getConversations";
import getUser from "../Action/getUser";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
    const conversations  = await getConversation();
    const users = await getUser();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} users={users}/>
        {children}
        </div>
    </Sidebar>
  );
}
