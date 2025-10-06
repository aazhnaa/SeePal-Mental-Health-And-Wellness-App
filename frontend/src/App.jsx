import React, { useEffect } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import Signup from './pages/Signup'
import Settings from './pages/Settings'
import MyProfile from './pages/MyProfile'
import Profile from './pages/Profile'
import { Loader} from 'lucide-react'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import './App.css'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import Messages from './pages/Messages'
import Dashboard from './pages/Dashboard'
import Explore from './pages/Explore'
import AdminDashboard from './pages/AdminDashboard'
import ContactUs from './pages/ContactUs'
import TherapistSettings from './pages/TherapistSettings'
import TherapistMyProfile from './pages/TherapistMyProfile'
//import Test from './pages/Test'
import Chatbot from './components/Chatbot'

const App = () => {
  
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  
  const location = useLocation();

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin'/>
    </div>
  )
  //console.log("in app.jsx , authuser : ", authUser.role);
  return (
    <>
      {!authUser ||
      location.pathname === "/profile" ||
      location.pathname == "/userProfile" ||
      location.pathname === "/messages" ||
      location.pathname === "/settings" ? null : (
        <Navbar />
      )}
      <Chatbot />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={authUser ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? (authUser.role === 'client' ? (<MyProfile/>) : authUser.role === 'therapist' ? (<TherapistMyProfile/>) : (<Navigate to ='/login'/>)):(<Navigate to='/login'/>)}
        />
        <Route
          path="/userProfile/:id"
          element={authUser ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/settings"
          element={authUser ? (authUser.role === 'client' ? (<Settings/>) : authUser.role === 'therapist' ? (<TherapistSettings/>) : (<Navigate to ='/login'/>)):(<Navigate to='/login'/>)}
        />
        
        <Route
          path="/messages"
          element={authUser ? <Messages /> : <Navigate to="/login" />}
        />
        <Route
          path="/explore"
          element={authUser ? <Explore /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact"
          element={authUser ? <ContactUs /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-dashboard"
          element={
            authUser?.role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App


// import React, { useEffect } from 'react'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Navbar from './components/Navbar'
// import Signup from './pages/Signup'
// import Settings from './pages/Settings'
// import MyProfile from './pages/MyProfile'
// import Profile from './pages/Profile'
// import { Loader} from 'lucide-react'
// import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
// import './App.css'
// import { useAuthStore } from './store/useAuthStore'
// import { Toaster } from 'react-hot-toast'
// import Messages from './pages/Messages'
// import Dashboard from './pages/Dashboard'
// import Explore from './pages/Explore'
// import AdminDashboard from './pages/AdminDashboard'
// import TherapistSettings from './pages/TherapistSettings'
// import TherapistMyProfile from './pages/TherapistMyProfile'
// //import Test from './pages/Test'
// import Chatbot from './components/Chatbot'


// const App = () => {
//   const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
//   useEffect(()=>{
//     checkAuth()
//   },[checkAuth])
  
//   const location = useLocation();

//   if(isCheckingAuth && !authUser) return(
//     <div className='flex items-center justify-center h-screen'>
//         <Loader className='size-10 animate-spin'/>
//     </div>
//   )
//   //console.log("in app.jsx , authuser : ", authUser.role);
//   return (
//     <div>
//       testing . . .
//     </div>
//   )
// }

// export default App


