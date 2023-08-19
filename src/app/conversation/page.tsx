"use client";
import React from "react";
import EmptyState from "../components/EmptyState";
import useConversation from "../hooks/useConversations";
import clsx from "clsx";

type Props = {};

export default function Home({}: Props) {
  const { isOpen } = useConversation();
  // console.log('isOpen',isOpen)
  return (
    <div
      className={clsx(
        `
    md:pl-80 h-full md:block
    `,
        isOpen ? "block" : "hidden"
      )}
    >
      <EmptyState />
    </div>
  );
}
