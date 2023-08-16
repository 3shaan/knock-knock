"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUsers from "@/app/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {HiChevronLeft, HiEllipsisHorizontal} from 'react-icons/hi2'
import ProfileDrawer from "./ProfileDrawer";
import AvatarGroup from "@/app/components/AvatarGroup";

type HeaderProps = {
  conversation : Conversation & {
    users: User[]
  }
};

export default function Header({conversation}: HeaderProps) {
  const otherUsers = useOtherUsers(conversation);
  const [openDrawer, setOpenDrawer] = useState(false);
  
  const statusText = useMemo(()=>{
    if(conversation.isGroup){
      return `${conversation.users.length} members`
    }
    return 'active'
  },[conversation])
  return (
    <>
      <ProfileDrawer 
      data={conversation}
      isOpen={openDrawer}
      isClose={()=>setOpenDrawer(false)}
      />
      <div
      className="
    w-full
    flex
    border-b-[1px]
    py-3
    px-4
    lg:px-6
    justify-between
    items-center
    shadow-md
    "
    >

      <div className="flex gap-3">
        <Link href={'/conversation'} className="
        md:hidden
        block 
        text-sky-500 
        hover:text-sky-600 
        transition 
        cursor-pointer
        ">
            <HiChevronLeft size={32}/>
        </Link>
        {
          conversation.isGroup ?
           (<AvatarGroup users={conversation.users}/>) : 
          (<Avatar user={otherUsers} />)
        }
      <div className="flex flex-col">
        <div>
          {conversation.name || otherUsers.name}
        </div>
        <div className="font-light text-neutral-600 text-sm">
          {statusText}
        </div>
      </div>
      </div>
      <div onClick={()=>{setOpenDrawer(true)}} className="
       text-sky-500
       cursor-pointer
       hover:text-sky-600
       transition
      ">
        
        <HiEllipsisHorizontal size={32}/>
      </div>
      
    </div>
    </>
  );
}
