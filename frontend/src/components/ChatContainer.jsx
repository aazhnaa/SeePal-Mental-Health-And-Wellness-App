import React, { useEffect, useRef } from 'react'
import {useChatStore} from '../store/useChatStore.js'
import MessageSkeleton from './skeletons/MessageSkeleton.jsx'
import ChatHeader from './ChatHeader.jsx'
import MessageInput from './MessageInput.jsx'
import { useAuthStore } from '../store/useAuthStore.js'
import {formatMessageTime} from '../lib/utils.js'
const ChatContainer = () => {
  const {messages, getMessages, isMessagesLoading, selectedUser,subscribeToMessages, unsubscribeFromMessages} = useChatStore();
  const {authUser} = useAuthStore();
  const MessageEndRef = useRef(null);
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return()=>unsubscribeFromMessages();
  }, [selectedUser._id, getMessages,subscribeToMessages,unsubscribeFromMessages]);

  useEffect(()=>{
    if(MessageEndRef.current && messages){
      MessageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  },[messages])

  //console.log("Messages:", messages);

  if(isMessagesLoading) return(
    <>
      <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
      </div>
    </>
  )

  return (
    <>
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <ChatHeader />

        {/* messages */}
        <div className="flex-1 px-4 space-y-2 overflow-auto ">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              ref={MessageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border ">
                  <img
                    src={
                      message.senderId === selectedUser._id
                        ? selectedUser.profilePic || "/avatar.png"
                        : authUser.profilePic || "/avatar.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-sm opacity-50 ml-1">
                  {" "}
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col  ">
                {message.image && (
                  <img
                    src={message.image}
                    alt="image"
                    className="max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p >{message.text}</p>}
              </div>
            </div>
          ))}
        </div>
        <MessageInput />
      </div>
    </>
  );
}

export default ChatContainer
