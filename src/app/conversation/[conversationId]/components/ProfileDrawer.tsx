"use client";

import Avatar from "@/app/components/Avatar";
import useOtherUsers from "@/app/hooks/useOtherUser";
import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { Fragment, useMemo, useState } from "react";
import { IoClose, IoTrash } from "react-icons/io5";
import { format } from "date-fns";
import Modal from "@/app/components/Modals/Modal";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

type ProfileDrawerProps = {
  data: Conversation & {
    users: User[];
  };
  isOpen: boolean;
  isClose: () => void;
};

export default function ProfileDrawer({
  data,
  isOpen,
  isClose,
}: ProfileDrawerProps) {
  const otherUser = useOtherUsers(data);
  const [isConfirmModal, setIsConfirmModal] = useState(false);

  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser.email!) !== -1;

  const title = useMemo(() => {
    return data.name || otherUser?.name;
  }, [data.name, otherUser?.name]);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active" : "Offline";
  }, [data, isActive]);

  return (
    <>
      <ConfirmModal
        isOpen={isConfirmModal}
        onClose={() => setIsConfirmModal(false)}
      />
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={isClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>
          <div
            className="
          fixed
          inset-0 
          overflow-hidden
          "
          >
            <div
              className="
            relative 
            inset-0 
            overflow-hidden
            "
            >
              <div
                className="
              pointer-events-none 
              fixed 
              inset-y-0 
              right-0 
              flex 
              max-w-full 
              pl-10"
              >
                <Transition.Child
                  as={Fragment}
                  enter="
                  transform 
                  translate 
                  ease-in-out 
                  duration-500
                  "
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform translate ease-in-out duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="
                  pointer-events-auto 
                  w-screen 
                  max-w-md"
                  >
                    <div
                      className="
                    bg-white 
                    
                    h-full 
                    py-6 
                    shadow-xl 
                    overflow-y-scroll
                    "
                    >
                      <div
                        onClick={isClose}
                        className="
                      flex 
                      w-full 
                      justify-end
                      cursor-pointer
                      "
                      >
                        <div
                          className="
                        mr-4
                        w-7
                        h-7
                        rounded-full
                        hover:bg-gray-200
                        focus:outline-none
                        hover:ring-2
                        focus:ring-indigo-500
                        focus:ring-offset-2
                        transition
                        "
                        >
                          <span className="sr-only">Close panel</span>
                          <IoClose size={28} />
                        </div>
                      </div>
                      {/* profile start */}
                      <div
                        className="
                      relative
                      mt-6
                      px-4
                      w-full
                      "
                      >
                        <div
                          className="
                      flex 
                      flex-col 
                      justify-center
                      items-center
                      text-center
                      "
                        >
                          <div>
                            {data.isGroup ? (
                              <AvatarGroup users={data.users} />
                            ) : (
                              <Avatar user={otherUser} />
                            )}
                          </div>

                          <p
                            className="
                          text-sm 
                          mt-4
                          "
                          >
                            {title}
                          </p>

                          <p
                            className="
                        text-xs 
                        text-gray-500
                        "
                          >
                            {statusText}
                          </p>
                          <div
                            onClick={() => setIsConfirmModal(true)}
                            className="
                          mt-4 
                          w-10 
                          h-10 
                          bg-neutral-100 
                          rounded-full 
                          flex 
                          items-center 
                          justify-center
                          cursor-pointer
                          "
                          >
                            <IoTrash size={20} />
                          </div>
                          <div className="text-sm font-light text-neutral-600">
                            Delete
                          </div>
                        </div>
                        {/* info Start  */}
                        <div>
                          {data.isGroup && (
                            <div>
                              <dt
                                className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                              >
                                Emails
                              </dt>
                              <dd
                                className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                              >
                                {data.users
                                  .map((user) => user.email)
                                  .join(", ")}
                              </dd>
                            </div>
                          )}
                          {!data.isGroup && (
                            <div>
                              <dt
                                className="
                                  text-sm 
                                  font-medium 
                                  text-gray-500 
                                  sm:w-40 
                                  sm:flex-shrink-0
                                "
                              >
                                Email
                              </dt>
                              <dd
                                className="
                                  mt-1 
                                  text-sm 
                                  text-gray-900 
                                  sm:col-span-2
                                "
                              >
                                {otherUser.email}
                              </dd>
                            </div>
                          )}
                          {!data.isGroup && (
                            <>
                              <hr />
                              <div>
                                <dt
                                  className="
                                    text-sm 
                                    font-medium 
                                    text-gray-500 
                                    sm:w-40 
                                    sm:flex-shrink-0
                                  "
                                >
                                  Joined
                                </dt>
                                <dd
                                  className="
                                    mt-1 
                                    text-sm 
                                    text-gray-900 
                                    sm:col-span-2
                                  "
                                >
                                  <time dateTime={joinedDate}>
                                    {joinedDate}
                                  </time>
                                </dd>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
