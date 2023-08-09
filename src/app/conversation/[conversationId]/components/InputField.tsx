import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

type InputFieldProps = {
    id : string;
    register : UseFormRegister<FieldValues>;
    errors : FieldErrors;
    placeHolder ?: string
    type ?: string
    required ?: boolean
}

export default function InputField({
    id,
    register,
    errors,
    placeHolder,
    type,
    required

}: InputFieldProps) {
  return (
    <div className='relative w-full'>
        <input type={type} 
        id={id}
        autoComplete={id}
        {...register(id, {required})}
        placeholder={placeHolder}
        className='
        w-full 
        bg-neutral-100
        text-black
        py-2
        px-4
        rounded-full
        focus:outline-none
        '
        />
    </div>
  )
}