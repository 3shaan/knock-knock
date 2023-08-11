"use client";

import clsx from "clsx";
import React from "react";

interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disable?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disable,
}) => {
  return (
    <div>
      <button
        type={type}
        disabled={disable}
        onClick={onClick}
        className={clsx(
          `
            flex
            justify-center
            rounded-md
            px-3
            py-2
            text-sm
            focus-visible:outline
            focus-visible:outline-2
            focus-visible:outline-offset-1
            `,
          disable && "opacity-50 cursor-default",
          fullWidth && "w-full",
          secondary ? "text-gray-900" : "text-white",
          danger &&
            "bg-red-500 focus:bg-rose-600 focus-visible:outline-red-500",
          !secondary &&
            !danger &&
            "bg-purple-700 focus:bg-purple-800 focus-visible:outline-purple-800"
        )}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
