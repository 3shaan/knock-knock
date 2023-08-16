"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ClipLoader } from "react-spinners";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Transition.Root as={Fragment} show>
      <Dialog as="div" className={"relative z-50"} onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
                fixed
                inset-0
                bg-gray-100
                bg-opacity-10
                transition-opacity
                "
          />
        </Transition.Child>
        <div
          className="
        fixed
        inset-0
        z-10
        overflow-y-auto
        "
        >
          <div
            className="
            flex
           justify-center
           items-center
            p-4
            min-h-full
            "
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel>
                <ClipLoader size={40} color="#0284c7" />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
