import { User } from "@prisma/client";
import Image from "next/image";

type AvatarGroupProps = {
  users: User[];
};

export default function AvatarGroup({ users }: AvatarGroupProps) {
  const sliceUsers = users.slice(0, 3);
  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };
  return (
    <section
      className="
    relative
    w-11
    h-11
    "
    >
      {sliceUsers.map((user, i) => (
        <div
          key={user.id}
          className={` 
          absolute
          inline-block
          rounded-full
          overflow-hidden
          h-[21px]
          w-[21px]
          ${positionMap[i as keyof typeof positionMap]}
          `}
        >
          <Image fill alt="Avatar" src={user.image || "/placeholder.jpg"} />
        </div>
      ))}
    </section>
  );
}
