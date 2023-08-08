"use client";
import { User } from "@prisma/client";
import UserBox from "./UserBox";

type UserListProps = {
  users: User[];
};

export default function UserList({ users }: UserListProps) {
  return (
    <aside
      className="
            fixed
            inset-y-0
            md:pl-24
            lg:pl-0
            lg:pb-0
            lg:left-20
            md:w-80
            overflow-y-auto
            border-r
            border-gray-200
            block
            w-full
            left-0

  "
    >
      <div>
        <div className="flex-col">
          <div
            className="
            text-xl
            font-semibold
            text-neutral-800
            py-4
            "
          >
            <span>People</span>
          </div>
        </div>
        <div>
          {users?.map((user) => {
            return <UserBox key={user.id} user={user} />;
          })}
        </div>
      </div>
    </aside>
  );
}
