"use client";
import Avatar from "@/app/components/Avatar";
import Loading from "@/app/components/Loading";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type UserBoxProps = {
  user: User;
};

export default function UserBox({ user }: UserBoxProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = useCallback(() => {
    setIsLoading(true);
    axios
      .post("/api/conversations", {
        userId: user.id,
      })
      .then((data) => {
        router.push(`/conversation/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [router, user]);
  return (
    <>
    {
      isLoading && <Loading/>
    }
    <div
      onClick={handleClick}
      className="
    w-full
    flex
    items-center
    space-x-4
    p-3
    rounded-lg
    cursor-pointer
    transition
    bg-white
    hover:bg-gray-100
    
    "
    >
      <Avatar user={user} />
      <div
        className="
        min-w-0 
        flex-1
        "
      >
        <div className="focus:outline-none">
          <div
            className="
                flex
                items-center
                
                "
          >
            <p className="
            text-sm
            font-medium
            text-gray-800
            ">{user?.name}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
