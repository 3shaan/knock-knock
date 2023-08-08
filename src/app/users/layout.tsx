import React from "react";
import getUser from "../Action/getUser";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const user = await getUser();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList users={user!} />
        {children}
      </div>
    </Sidebar>
  );
}
