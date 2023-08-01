'use client'

import React from 'react';
import { IconType } from 'react-icons';

interface SocialLoginButtonProps {
    icon: IconType
    onClick :()=>void 
}

const SocialLoginButton:React.FC <SocialLoginButtonProps> = ({
    icon:Icon,
    onClick,
}) => {
    return (
        <button 
        onClick={onClick}
        type='button'
        className='
        inline-flex
        rounded-md
        px-4
        py-2
        shadow-sm
        justify-center
        ring-1
        ring-insect
        w-full
        '
        >
            <Icon/>
        </button>
    );
};

export default SocialLoginButton;