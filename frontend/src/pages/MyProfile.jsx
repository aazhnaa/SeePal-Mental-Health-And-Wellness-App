import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthStore } from "../store/useAuthStore";
import {formatJoinDate} from '../lib/utils.js';
import JournalCard from "../components/JournalCard.jsx";
import { Loader } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import { usePostStore } from "../store/usePostStore.js";
import Post from "../components/Post.jsx";
import { axiosInstance } from "../lib/axios.js";
const Profile = () => {
  const { authUser, getFollowers,checkAuth, isCheckingAuth, getFollowings } = useAuthStore();
  const {userPosts, getUserPost, areUserPostsLoading} = usePostStore();
  const [entry, setEntry] = useState([]);
  const [isEntryLoading, setIsEntryLoading] = useState(false);
  // console.log("authUser : ", authUser._id);

    useEffect(() => {
    checkAuth();
    console.log("authUser : ", authUser._id);
  }, [checkAuth]);

  useEffect(() => {
    const fetchEntries = async (id) => {
      setIsEntryLoading(true);
      try {
        const res = await axiosInstance.get(`/entry/${id}`);
        setEntry(res.data);
      } catch (error) {
        console.log(
          "error in MyProfile while fetching journal entries ",
          error
        );
      } finally {
        setIsEntryLoading(false);
      }
    };

    fetchEntries(authUser._id);
  },[]);

  useEffect(() => {
    getUserPost(authUser._id);
  }, [authUser._id, getUserPost]);



  const handleGetFollowers = async(e)=>{
      e.preventDefault()
      try {
        console.log('sending id : ', authUser._id)
        await getFollowers(authUser._id)
      } catch (error) {
        console.log('error while fetching followers :', error)
      }
    }
    const handleGetFollowings = async(e)=>{
      e.preventDefault()
      try {
        console.log('sending id : ', authUser._id)
        await getFollowings(authUser._id)
      } catch (error) {
        console.log('error while fetching followers :', error)
      }
    }


  console.log("authUser : ", authUser.fullName);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  return (
    <>
      <div className="flex min-h-screen bg-base-200">
        {/* SideBar */}
        <Sidebar />
        <div className="absolute sm:hidden w-full h-fit bg-brand">
          <Navbar />
        </div>

        {/*Main Area */}
        <div className="w-full mt-8 flex flex-col gap-6 p-10">
          {/* About user */}
          <div className="aboutUser border-b-2 pb-6 ">
            <div className="flex flex-col  ">
              <div className="image w-fit h-fit basis-2/5 flex justify-center rounded-full">
                <div className=" top-0 size-16 sm:size-36 rounded-full overflow-hidden ">
                  <img src={authUser.profilePic || "./avatar.png"} alt="" />
                </div>
              </div>
              <div className="basis-3/5">
                <p className="text-lg font-bold ">
                  {authUser.fullName || "Full Name"}
                </p>
                <p className=" text-gray-600">@{authUser.username}</p>
                <p className="text-brand">
                  {" "}
                  Joined {formatJoinDate(authUser.createdAt)}
                </p>
                <p className="text-sm text-gray-700">
                  Age :{" "}
                  <span className="text-gray-700 font-bold">
                    {authUser.age || "20"}
                  </span>
                </p>
                <p className="text-sm">{authUser.description || ""}</p>
                <div className="w-full grid grid-cols-2 justify-between items-center gap-4 mt-4">
                  <button
                    onClick={handleGetFollowers}
                    className="border cursor-pointer shadow-[0_0_8px_#006d77] flex flex-col justify-start border-brand rounded-md h-16 p-2"
                  >
                    <span className="text-brand font-bold text-xl">0 </span>
                    <p>followers</p>
                  </button>
                  <button
                    onClick={handleGetFollowings}
                    className="border cursor-pointer shadow-[0_0_8px_#006d77] flex flex-col border-brand rounded-md h-16 p-2"
                  >
                    <span className="text-brand font-bold text-xl">0 </span>
                    <p>followings</p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*User Posts & Journal entries */}
          <div className="post-and-journal-area flex flex-row">
            {/*User's Posts */}
            <div className="border-r w-full">
              <h1 className="text-2xl font-bold text-brand border-b pb-2">
                Your Posts
              </h1>
              {areUserPostsLoading ? (
                <div className="flex items-center justify-center h-screen">
                  <Loader className="size-10 animate-spin" />
                </div>
              ) : (
                userPosts.map((post) => (
                  <div className="" key={post._id}>
                    <Post post={post} />
                  </div>
                ))
              )}
            </div>

              {/*User's journal entries */}
            <div className="pl-4">
              {isEntryLoading ? (
                <div className="flex items-center justify-center h-screen">
                  <Loader className="size-10 animate-spin" />
                </div>
              ) : (
                <>
                <h1 className="text-3xl font-bold text-brand pb-4">Your Journal entries</h1>
                <div className="">
                  {entry.length === 0 ? (
                    <div className="text-center p-10 text-gray-500">
                      <p>No journal entries yet</p>
                      <p>Why not write your first one?</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-6">
                      {entry.map((entry) => (
                        <JournalCard key={entry._id} entry={entry} />
                      ))}
                    </div>
                  )}
                </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
