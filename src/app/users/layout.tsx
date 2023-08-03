import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'

type Props = {
    children : React.ReactNode
}

export default function layout({children}: Props) {
  return (
    <Sidebar>
    <div className='h-full'>
      {children}
    </div>
    </Sidebar>
  )
}