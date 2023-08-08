import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";

export default function useOtherUsers(
  conversation: FullConversationType | { users: User[] }
) {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;
    const otherUser = conversation.users?.filter(
      (user) => user.email !== currentUserEmail
    );
    console.log(otherUser);
    return otherUser[0];
  }, [session.data?.user?.email, conversation]);
  return otherUser;
}
