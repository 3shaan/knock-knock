"use client";

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disable?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disable,
}) => {
  return (
    <div>
      <label
        className="
            block
            font-medium 
            text-sm
            leading-6
            text-gray-900
            "
        htmlFor={id}
      >
        {label}
      </label>

      <div className="mt-2">
        <input
          type={type}
          id={id}
          autoCapitalize={id}
          disabled={disable}
          {...register(id, { required })}
          className={clsx(
            `block
            shadow
            appearance-none
            border-0
            rounded-md
            w-full
            py-2
            px-3
            ring-1
            ring-inset
            ring-gray-300
            text-gray-900 
            leading-tight
            focus:ring-1
            focus:ring-inset
            focus:ring-sky-600`,
            errors[id] && "focus:ring-rose-500",
            disable && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
