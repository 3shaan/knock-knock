import { FullMessageTypes } from '@/app/types'
import React from 'react'

type BodyProps = {
  initialMessage : FullMessageTypes[]
}

export default function Body({}: BodyProps) {
  return (
    <div className='flex-1 overflow-y-auto'>Body</div>
  )
}