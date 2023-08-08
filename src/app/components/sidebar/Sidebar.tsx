import React from 'react'
import DesktopSidebar from './DesktopSidebar'
import MobileFooter from './MobileFooter'
import getCurrentUser from '@/app/Action/getCurrentUser'

type Props = {
    children : React.ReactNode
}

export default async function Sidebar({children}: Props) {
  const currentUser = await getCurrentUser();
  return ( 
    <div className='h-full'>
        <DesktopSidebar currentUser={currentUser!}/>
        <MobileFooter/>
        <main className='
        lg:pl-10 h-full
        '
        >
        {children}
        </main>
    </div>
  )
}