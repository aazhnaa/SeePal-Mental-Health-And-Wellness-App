import React from 'react'
import {formatTimeAgo} from '../lib/utils.js'

const Post = ({post}) => {
  return (
    <>
      <div className="w-full p-4 border-b">
        <div className="flex flex-row gap-2 w-full">
          <img
            src={post?.posterId?.profilePic || './avatar.png'}
            alt="profile"
            className="w-10 h-10 rounded-full cursor-pointer"
          />
          <div className="grid-rows-4 w-full font-poppins">
            <div className="flex gap-2 items-center ">
              <p className="text-md text-brand font-bold hover:underline cursor-pointer">
                {post?.posterId?.fullName}
              </p>
              <p className="text-gray-500"> @{post?.posterId?.username} </p>
              <p className="text-sm text-gray-500"> {formatTimeAgo(post?.createdAt)} </p>
            </div>
            <p className='font-bold text-md'>{post?.title}</p>
            <p className='text-lg'>{post?.text}</p>
            {post.image && <img src={post?.image} alt="" className='w-2/3 rounded-lg  '/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Post
