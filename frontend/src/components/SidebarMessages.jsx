import React, { useEffect, useRef } from 'react'
import { IoMdHome } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5";
import {NavLink} from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';
import { TbLogout2 } from "react-icons/tb";
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { Users } from 'lucide-react';
import { formatMessageTime } from '../lib/utils';
import ChatContainer from './ChatContainer';


const SidebarMessages = () => {
    const {logout, authUser,onlineUsers} = useAuthStore();
    const {getUsers, users, selectedUser, setSelectedUser,subscribeToMessages,unsubscribeFromMessages,isUsersLoading,messages,getMessages} = useChatStore();
    useEffect(()=>{
      getUsers()
    },[getUsers])

    if(isUsersLoading) return <SidebarSkeleton/>
  return (
    <>
      <div className="flex flex-row w-full relative sm:w-1/3">
        {/* mini side bar */}
        <div className="minisidebar hidden sm:w-16  bg-dark_brand shadow-md p-4 text-white sm:flex flex-col  items-center">
          <h2 className="text-xl text-center font-bold mb-6">
            <NavLink to="/">SP</NavLink>
          </h2>
          <ul className="menu gap-4 ">
            <li>
              <NavLink to="/dashboard">
                <IoMdHome className="w-8 h-8" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/settings">
                <IoSettingsSharp className="w-8 h-8" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <div className="w-fit h-fit relative">
                  <div className="avatar">
                    <div className="w-8 rounded-full ring ring-brand ring-offset-base-100 ring-offset-2">
                      <img
                        src={authUser.profilePic || "./avatar.png"}
                        alt="Profile Preview"
                      />
                    </div>
                  </div>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={logout}>
                <TbLogout2 className="w-8 h-8" />
              </NavLink>
            </li>
          </ul>
        </div>
        {selectedUser ? 
        (
          <div className="contactsBar h-full w-full hidden border-r mt-16 sm:mt-0 border-base-300 sm:flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
              <div className="flex items-center gap-2">
                <Users className="size-6" />
                <span className="font-medium  block">Contacts</span>
              </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
              {users.map((user) => (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-3 flex items-center border-b sm:border-none gap-3 hover:bg-base-300 transition-colors ${
                    selectedUser?._id === user._id
                      ? "bg-base-300 ring-1 ring-base-300"
                      : ""
                  }`}
                >
                  <div className="relative mx-0">
                    <img
                      src={user.profilePic || "./avatar.png"}
                      alt={user.username}
                      className="size-12 object-cover rounded-full"
                    />
                    {onlineUsers.includes(user._id) && (
                      <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-offset-zinc-900"></span>
                    )}
                  </div>

                  <div className=" block text-left min-w-0">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-zinc-400">
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : 
        (
          <div className="contactsBar h-full w-full border-r mt-16 sm:mt-0 border-base-300 flex flex-col transition-all duration-200">
            <div className="border-b border-base-300 w-full p-5">
              <div className="flex items-center gap-2">
                <Users className="size-6" />
                <span className="font-medium  block">Contacts</span>
              </div>
            </div>

            <div className="overflow-y-auto w-full py-3">
              {users.map((user) => (
                <button
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`w-full p-3 flex items-center border-b sm:border-none gap-3 hover:bg-base-300 transition-colors ${
                    selectedUser?._id === user._id
                      ? "bg-base-300 ring-1 ring-base-300"
                      : ""
                  }`}
                >
                  <div className="relative mx-0">
                    <img
                      src={user.profilePic || "./avatar.png"}
                      alt={user.username}
                      className="size-12 object-cover rounded-full"
                    />
                    {onlineUsers.includes(user._id) && (
                      <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-offset-zinc-900"></span>
                    )}
                  </div>

                  <div className=" block text-left min-w-0">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-zinc-400">
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {selectedUser ? (
          <div className="sm:hidden mt-16 w-full overflow-y-scroll">
            <ChatContainer />
            
          </div>
        ) : (
          <div className="sm:hidden"></div>
        )}
      </div>
    </>
  );
}

export default SidebarMessages
