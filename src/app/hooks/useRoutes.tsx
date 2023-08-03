import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiArrowLeftOnRectangle, HiUser } from "react-icons/hi2";
import { HiChat } from "react-icons/hi";
import useConversation from "./useConversations";
import { signOut } from "next-auth/react";

const useRoutes = () => {
  const pathName = usePathname();
  const { conversationId } = useConversation();

  const route = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversation",
        icon: HiChat,
        active:pathName === '/conversation' || !!conversationId
      },
      {
        label:"Users",
        href:"/users",
        icon:HiUser,
        active: pathName === '/users' || !!conversationId
      },
      {
        label:"Logout",
        Onclick :()=> signOut(),
        href:'#',
        icon:HiArrowLeftOnRectangle
      }
    ],
    [pathName, conversationId]
  );
  return route;
};

export default useRoutes;
