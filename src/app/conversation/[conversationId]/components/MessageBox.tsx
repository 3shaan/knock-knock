import Avatar from "@/app/components/Avatar";
import { FullMessageTypes } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";

type MessageBoxProps = {
  isLast?: boolean;
  data: FullMessageTypes;
};

export default function MessageBox({ isLast, data }: MessageBoxProps) {
  const session = useSession();
  const isOwn = session.data?.user?.email === data.sender.email;

  const seenList = data.seen
    .filter((user) => user.email !== data.sender.email)
    .map((user) => user.name)
    .join(", ");

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-center");
  const message = clsx(
    `text-sm w-fit overflow-hidden`,
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : " rounded-full px-2 py-3"
  );
  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-500">
            {format(new Date(data.CreateAt), "p")}
          </div>
        </div>

        <div className={message}>
          {data.image ? (
            <Image
              width={200}
              height={200}
              src={data.image}
              alt="Message"
              className="
            object-cover 
            cursor-pointer 
            hover:scale-110 
            transition 
            translate
          "
            />
          ) : (
            <div>{data.body} </div>
          )}
        </div>
        <div>
          {isLast && isOwn && seenList.length > 0 && (
            <div
              className="
                    text-xs
                    text-light
                    text-gray-300
                    "
            >
              {`seen by ${seenList}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
