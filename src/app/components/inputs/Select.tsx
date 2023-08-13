'use client'
import React from 'react'
import ReactSelect from 'react-select';


type SelectProps = {
    label: string;
    value?: Record<string, any>;
    onChange: (value: Record<string, any>) => void;
    options: Record<string, any>[] 
    disable?: boolean;
}

export default function Select({
    label,
    value,
    onChange,
    options,
    disable
}: SelectProps) {
  return (
    <div className='z-[100]'>
        <label className='
        block
        text-sm
        font-medium
        leading-5
        text-gray-800
        pb-2
        '>
            {label}
            
        </label>
    <ReactSelect 
    isDisabled={disable}
    options={options}
    value={value}
    onChange={onChange}
    isMulti
    styles={{
        menuPortal:(base)=>({...base, zIndex:9999})
    }}
    classNames={{
        control:()=>'text-sm'
    }}
    />
        
    </div>
  )
}