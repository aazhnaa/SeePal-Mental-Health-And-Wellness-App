import React from 'react'
import SidebarMessages from '../components/SidebarMessages.jsx'
import ChatContainer from '../components/ChatContainer.jsx'
import { useChatStore } from '../store/useChatStore.js'
import NoChatSelected from '../components/NoChatSelected.jsx'
import SidebarSkeleton from '../components/skeletons/SidebarSkeleton.jsx'
import { NavLink } from 'react-router-dom'
import { IoMdArrowRoundBack } from "react-icons/io";

const Messages = () => {
    const {selectedUser} = useChatStore();
  return (
    <>
       <div className="main flex h-screen w-full flex-row  overflow-hidden">

        <nav className='w-full h-16 sm:hidden bg-brand absolute flex items-center space-x-36 '>
          <NavLink to="/dashboard">
          <p className='font-bold text-white p-2 text-3xl'><IoMdArrowRoundBack/></p>
          </NavLink>

          <NavLink to="/dashboard">
          <p className='font-bold text-white p-2 text-xl'>SeePal</p>
          </NavLink>
        </nav>
        
        <SidebarMessages/>
        {selectedUser?<ChatContainer/>:<NoChatSelected/>}        
        </div> 
    </>
  )
}

export default Messages
