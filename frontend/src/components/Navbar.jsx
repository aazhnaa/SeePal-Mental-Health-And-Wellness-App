import React, { useEffect, useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { NavLink, Link, useLocation} from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    const {logout,authUser,getUserByUsername, searchedUsers} = useAuthStore()
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const searchRef = useRef(null)

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          useAuthStore.setState({ searchedUsers: [] });
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      };
    },[]);
    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        setDebouncedQuery(query);
      }, 300); // delay in ms

      return () => clearTimeout(delayDebounce);
    }, [query]);

    useEffect(()=>{
      if(debouncedQuery.trim() === ""){
        useAuthStore.setState({ searchedUsers: [] });
        return;
      }
      getUserByUsername(debouncedQuery);
    },[debouncedQuery])

    const results = searchedUsers


    const handleToggle = () =>{
      setIsOpen(!isOpen);
    }

    if(!authUser) return;
    
  return (
    <>
      <div
        className={`navbar text-brand hover:text-dark_brand `}
      >
        <div className="flex-1 flex">
          <NavLink
            to="/"
            className="btn btn-ghost font-poppins-bold text-dark_brand  text-xl md:text-3xl"
          >
            SeePal
          </NavLink>
          <div ref={searchRef} className="form-control w-full max-w-md flex flex-col justify-center items-center ">
            <div className="w-full max-w-md">
              <div className="input-group flex gap-2 rounded-full border-gray-300 border">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="input  w-full rounded-full border-none focus:outline-none focus:ring-0"
                />
                <button className="bg-inherit text-brand pr-6">
                  <FaSearch />
                </button>
              </div>
            </div>
            <div className="absolute top-16 w-full max-w-md">
              {results.length > 0 && (
                <ul className="bg-white shadow rounded mt-2 p-2 ">
                  {results.map((user) => (
                    <Link key={user._id} to={`userProfile/${user._id}`}>
                      <li className="flex items-center gap-3 py-2 border-b cursor-pointer" >
                      <img
                        src={user.profilePic || "./avatar.png"}
                        alt={user.username}
                        className="w-8 h-8 rounded-full object-cover hover:scale-105"
                      />
                      <span className='hover:underline'>{user.username}</span>
                    </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-6">
          {/* desktop menu */}
          <div className="md:flex space-x-6 desktopmenu hidden">
            {location.pathname !== "/" && (
              <NavLink to="/">
                <button className="button">Home</button>
              </NavLink>
            )}
            {location.pathname !== "/dashboard" && (
              <NavLink to="/dashboard">
                <button className="button">Dashboard</button>
              </NavLink>
            )}
            {authUser.role === "admin" && <NavLink to="/admin-dashboard"><button className="button">Admin Dashboard</button></NavLink> }
            <NavLink to="/explore">
              <button className="button">Explore</button>
            </NavLink>
            <NavLink to="/messages">
              <button className="button">Message</button>
            </NavLink>
            <NavLink to="/contact">
              <button className="button">Contact us</button>
            </NavLink>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={authUser.profilePic || "./avatar.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="/profile" className="justify-between">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings">Settings</NavLink>
                </li>
                <li>
                  <button onClick={logout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>

          {/* mobile menu */}
          <div className="md:hidden text-white ">
            <button onClick={handleToggle} className="flex flex-col gap-2  ">
              <RxHamburgerMenu className="text-brand" />
              {isOpen ? (
                <div className="dropdown-content absolute top-16 right-2 bg-brand text-white p-4 flex flex-col justify-center rounded-lg shadow-lg">
                  <NavLink to="/profile">
                    <div className="w-10 rounded-full overflow-hidden">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={authUser.profilePic || "./avatar.png"}
                      />
                    </div>
                  </NavLink>
                  {location.pathname !== "/" && (
                    <NavLink to="/">
                      <p className="p-2">Home</p>
                    </NavLink>
                  )}
                  {location.pathname !== "/dashboard" && (
                    <NavLink to="/dashboard">
                      <p className="p-2">Dashboard</p>
                    </NavLink>
                  )}
                  <NavLink to="/explore">
                    <p className="p-2">Explore</p>
                  </NavLink>
                  <NavLink to="/messages">
                    <p className="p-2">Messages</p>
                  </NavLink>
                  <NavLink to="/messages">
                    <p className="p-2">Contact Us</p>
                  </NavLink>
                </div>
              ) : (
                <></>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar
