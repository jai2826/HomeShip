import React from 'react'
import { SideNavbar } from '../components/Settings/SideNavbar'
import { Outlet } from 'react-router-dom';

const Settings = () => {
  return (
    <div className='flex w-full space-x-1 '>
        <SideNavbar/>
        <Outlet/>
        
    </div>
  )
}

export default Settings