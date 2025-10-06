import React from 'react'
import {NavLink} from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { IoMdHome } from 'react-icons/io'
import { IoSettingsSharp } from 'react-icons/io5'
import { TbLogout2 } from 'react-icons/tb'
import { Users } from 'lucide-react'
const SidebarSkeleton = () => {
    const {logout,authUser} = useAuthStore();
    const skeletonContacts = Array(8).fill(null);
  return (
    <>
      <div className='flex flex-row'>
        {/* mini side bar */}
        <div className="w-16 bg-dark_brand shadow-md p-4 text-white flex flex-col  items-center">
          <h2 className="text-xl text-center font-bold mb-6">
            <NavLink to="/">SP</NavLink>
          </h2>
          <ul className="menu gap-4 ">
            <li>
              <NavLink to="/">
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

        <aside
      className="h-full w-20 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200"
    >
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            {/* Avatar skeleton */}
            <div className="relative mx-auto lg:mx-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
      </div>
    </>
  )
}

export default SidebarSkeleton
