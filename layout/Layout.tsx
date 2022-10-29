import TheHeader from '@/components/TheHeader'
import React, { PropsWithChildren } from 'react'

const Layout:React.FC<PropsWithChildren> = ({children}) => {
  return (
   <div>
    <TheHeader/>
    <main className='self-center mx-auto lg:mx-auto container max-w-[1280px]'>{children}</main>
   </div>
  )
}

export default Layout