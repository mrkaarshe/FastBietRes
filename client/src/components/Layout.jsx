import React from 'react'
import Header from './Header'
import Cart from './Cart'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='overflow-x-hidden px-1'>
        <main className=''>
            <Header/>
                <div className='  ' >
                    <Outlet/>
                </div>
            <Footer/>
        </main>

    </div>
  )
}

export default Layout