import React from 'react';

const EmptyState = () => {
    return (
        <div className='
        px-4
        py-10
        md:px-6
        md:py-10
        bg-gray-100
        h-full
        flex
        justify-center
        items-center
        '>
            <div className='
            text-center 
            flex
            flex-col 
            items-center 
            '>
             <h3 className='
             mt-2
             text-xl
             font-semibold
             text-gray-900
             '>
             click here to start a conversation
             </h3>
            </div>
        </div>
    );
};

export default EmptyState;