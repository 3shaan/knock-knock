"use client";
import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";

interface AvatarProps {
  user: User;
}

const Avatar: React.FC<AvatarProps> = ({ user }) => {
  return (
    <div className="relative">
      <div
        className="
            relative
            rounded-full
            w-9
            h-9
            lg:w-11
            lg:h-11
            inline-block
            overflow-hidden
            "
      >
        <Image alt="Avatar" src={user?.image || "/placeholder.jpg"} fill />
      </div>
      <span
        className="
            absolute
            inline-block
            bg-green-500
            w-2
            h-2
            top-0
            right-0
            rounded-full
            "
      />
    </div>
  );
};

export default Avatar;
