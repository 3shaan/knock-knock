import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: Props) {
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="
                fixed 
                inset-0 
                bg-gray-500
                bg-opacity-75
                transition-opacity
                "
          />
        </Transition.Child>
        <div
          className="
        fixed 
        inset-0 
        z-20 
        overflow-y-auto
        "
        >
          <div
            className="
            flex
            items-center
            justify-center
            min-h-full
            p-4
            text-center
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
              <Dialog.Panel
                className="
                relative
                transform
                bg-white
                rounded-lg
                px-3
                py-4
                shadow-lg
                "
              >
                <div
                  className="
                    absolute
                    right-0
                    top-0
                    hidden 
                    pr-4 
                    pt-4 
                    sm:block
                    z-10
                    "
                >
                  <button
                    type="button"
                    className="
                      rounded-full
                      bg-white 
                      hover:text-gray-500 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-indigo-500 
                      focus:ring-offset-2
                    "
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <IoClose className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
