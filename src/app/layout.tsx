import ToastContext from './context/ToastContext'
import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'knock-knock',
  description: 'knock-knock messenger app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ToastContext/>
        {children}
        </body>
    </html>
  )
}
