"use client";

import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import React from "react";

interface DesktopSidebarProps {
    currentUser:User | null;
}

const DesktopSidebar:React.FC<DesktopSidebarProps> = ({
    currentUser
}) => {
  const routes = useRoutes();
  console.log(currentUser);
  return (
    <div className="
    hidden
    md:fixed
    md:left-0
    md:z-30
    md:w-20
    md:inset-y-0
    md:overflow-y-auto
    md:border-r-[1px]
    md:flex
    justify-between
    md:flex-col
    
    ">
      <nav className="
      mt-4
      flex
      flex-col
      justify-between
      ">
        <ul className="
        flex
        flex-col
        items-center
        space-y-1
        ">
        {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                label={item.label}
                icon={item.icon}
                active={item.active}
                onClick={item?.Onclick}
              />
            ))}
        </ul>
       
      </nav>
    </div>
  );
};

export default DesktopSidebar;
