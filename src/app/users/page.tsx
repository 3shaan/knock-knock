import React from 'react'
import EmptyState from '../components/EmptyState'

type Props = {}

export default function Users({}: Props) {
  return (
    <div className='
    hidden
    md:block
    md:pl-[22.5rem]
    h-full
    
    '>
      <EmptyState/>
    </div>
  )
}