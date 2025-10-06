import React, { useRef, useState, useEffect } from 'react'
import { Image, Loader, X } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';
import Post from '../components/Post';
import {NavLink} from 'react-router-dom';
import { usePostStore } from '../store/usePostStore';
import {toast} from 'react-hot-toast'

const Feed = () => {
    const {authUser} = useAuthStore();
      const {posts,createPost, getAllPosts, arePostsLoading} = usePostStore();
      const [imagePreview, setImagePreview] = useState(null);
      const [text, setText] = useState("");
      const [title, setTitle] = useState("");
      const fileInputRef = useRef(null);
      useEffect(() => {
		getAllPosts();
	}, []);
      
        const handleSubmitPost=async(e)=>{
          e.preventDefault();
          if(!text.trim() && !imagePreview) return;
          try {
            await createPost({
              text:text.trim(),
              title:title.trim(),
              image:imagePreview
            })
      
            setText("")
            setTitle("")
            setImagePreview(null)
          } catch (error) {
            console.error("error creating post:", error);
          }
        }
      
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
          }
      
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result);
          };
          reader.readAsDataURL(file);
        };
      
        const removeImagePreview = () => {
          setImagePreview(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
        };
  return (
    <>
    <div className=" flex max-w-5xl w-full justify-center flex-col ">
          <form
            className=" h-fit p-4 border rounded-xl border-brand pr-4"
            onSubmit={handleSubmitPost}
          >
            <div className="flex flex-row gap-4 ">
              <NavLink to="/profile">
                <img
                  src={authUser?.profilePic || "./avatar.png"}
                  alt="profile pic"
                  className="w-10 h-10 rounded-full"
                />
              </NavLink>
              <div className="flex flex-col w-full gap-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title"
                    className="text-md w-2/3  text-brand font-mono focus:outline-none focus:ring-0"
                  />
                </div>
                <textarea
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="What's in your mind today?"
                  className="text-3xl w-full text-wrap text-brand font-poppins mb-4 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            {imagePreview && (
              <div className="mb-3 flex items-center gap-2 ">
                <div className="relative">
                  <img
                    src={imagePreview || "./avatar.png"}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                  />
                  <button
                    onClick={removeImagePreview}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                    type="button"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-2 mb-2">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className=" "
              >
                <Image className="w-10 h-10 text-brand" />
              </button>

              <button
                type="submit"
                className="p-2 md:pl-4 md:pr-4 w-1/3 bg-brand hover:bg-dark_brand cursor-pointer text-white rounded-md font-semibold"
                disabled={!text.trim() && !imagePreview}
              >
                Post
              </button>
            </div>
          </form>


          <div className=" w-full flex flex-col justify-center items-center mt-8 ">
            {arePostsLoading ? (
              <>
                <div className="flex items-center justify-center h-full ">
                  <Loader className="size-10 animate-spin" />
                </div>
              </>
            ) : (
              posts.map((post) => <Post key={post._id} post={post} />)
            )}
          </div>
        </div>
    </>
  )
}

export default Feed
