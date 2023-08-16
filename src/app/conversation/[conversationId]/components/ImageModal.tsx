import Modal from '@/app/components/Modals/Modal';
import Image from 'next/image';
import React from 'react'

type ImageModalProps = {
    isOpen?:boolean;
    onClose :()=>void;
    src?: string | null
}

export default function ImageModal({
    isOpen,
    onClose,
    src
}: ImageModalProps) {
  return (
    <Modal 
    isOpen={isOpen}
    onClose={onClose}
    >
        <div className='w-80 h-80'>
            <Image 
            fill
            alt='Image'
            className='object-cover'
            src={src as string}
            />
        </div>

    </Modal>
  )
}