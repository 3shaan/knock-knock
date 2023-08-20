import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUser } from "react-icons/hi2";
import useConversation from "./useConversations";

const useRoutes = () => {
  const pathName = usePathname();
  const { conversationId } = useConversation();

  const route = useMemo(
    () => [
      {
        label: "Chat",
        href: "/conversation",
        icon: HiChat,
        active: pathName === "/conversation" || !!conversationId,
      },
      {
        label: "Users",
        href: "/users",
        icon: HiUser,
        active: pathName === "/users" || !!conversationId,
      },
      {
        label: "Logout",
        Onclick: () => signOut(),
        href: "/",
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathName, conversationId]
  );
  return route;
};

export default useRoutes;
