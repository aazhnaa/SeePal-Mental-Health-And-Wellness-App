import React from 'react'
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
    const {logout} = useAuthStore();
    const location = useLocation();
  return (
    <>
      <div className="w-64 bg-brand hidden sm:block shadow-md p-4 text-white">
        <h2 className="text-xl font-bold mb-6">
          <NavLink to="/">SeePal</NavLink>
        </h2>
        <ul className="menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/messages">Messages</NavLink>
          </li>
          {location.pathname !== "/profile" ? (
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
          ) : null}
          <li>
            <NavLink to="/settings">Settings</NavLink>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar
