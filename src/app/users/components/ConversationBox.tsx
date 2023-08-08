import { FullConversationType } from '@/app/types'
import React from 'react'

type ConversationBoxProps = {
    data : FullConversationType,
    selected:boolean
}

export default function ConversationBox({}: ConversationBoxProps) {
  return (
    <div>ConversationBox</div>
  )
}