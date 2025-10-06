import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import { Navigate, useParams } from "react-router-dom";
import { usePostStore } from "../store/usePostStore";
import Post from "../components/Post";
import { Loader } from "lucide-react";
const Profile = () => {  
  const { authUser, checkAuth, isCheckingAuth, getUserById, user} = useAuthStore();
  const {userPosts, getUserPost, areUserPostsLoading} = usePostStore()
  
  const {id} = useParams();

  useEffect(()=>{
    const fetchUser = async () =>{
      try {
        await getUserById(id)
      } catch (error) {
        console.log("Error in fetching user in (user) profile.jsx");
      }
    }
    if(id){
      fetchUser()
    }
  },[id, getUserById])
 
    useEffect(() => {
      checkAuth();
    }, [checkAuth]);

    useEffect(()=>{
      getUserPost(id)
    },[id,getUserPost])
  
    if (isCheckingAuth && !authUser)
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      );
  return (
    <>
      <div className="flex min-h-screen">
        {/* SideBar */}
        <Sidebar />

        {/*Main Area */}
        <div className="w-full flex flex-col gap-6 p-6">
          {/* About user */}
          <div className="aboutUser border-b-2 pb-6">
            <div className="flex flex-row  ">
              <div className="image w-fit h-fit basis-2/5 flex justify-center mt-6 rounded-full">
                <div className=" top-0 w-36 h-36 rounded-full overflow-hidden ">
                  <img src={user?.profilePic || "/avatar.png"} alt="" />
                </div>
              </div>
              <div className="basis-3/5">
                <p className="font-bold text-xl">{user?.username}</p>
                <div className="buttons flex gap-2">
                  <button className={`p-2 bg-brand hover:bg-dark_brand text-white rounded-lg w-1/3 font-bold`} >
                  Follow
                  </button>
                  <button className="p-2 bg-white border hover:bg-gray-100 border-brand rounded-lg w-1/3 text-brand font-bold">
                    Message
                  </button>
                </div>
                <div className="followers flex gap-12">
                  <p>
                    <span className="text-gray-700 font-bold">0 </span>Posts
                  </p>
                  <p >
                    0 Follower
                  </p>
                  <p >
                    0 Following
                  </p>
                </div>
                <p className="text-lg text-gray-600">
                  {user?.fullName || ""}
                </p>
                <p className="text-sm">
                  <span className="text-gray-700 font-bold">
                    {user?.age || ""}
                  </span>
                </p>
                <p className="text-lg font-bold">{user?.licenseNumber}</p>
                <p className="text-sm">{user?.description || ""}</p>
                {
                  user?.role === 'therapist' && (<div className="flex flex-col">
                    <p className="font-bold text-gray-600">Specialities</p>
                    <p className="font-bold text-gray-600">Qualities</p>
                  </div>)
                }
              </div>
            </div>
          </div>

          {/*Posts */}
          <h1 className="font-poppins-bold text-3xl text-brand">{`Community Posts by ${user?.username}`} </h1>
          {areUserPostsLoading ? (
              <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
              </div>
            ) : 
            ( userPosts.map((post)=>
            <div className='' key={post._id}>
              <Post  post={post} />
              </div>)
              )}
        </div>
      </div>
    </>
  );
};

export default Profile;
