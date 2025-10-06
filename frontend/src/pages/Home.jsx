import React from 'react'

const Home = () => {
  return (
    <div className="  h-screen relative bg-white overflow-hidden">
      <div className='size-40 md:w-80 md:h-80 bg-[url("./logo.png")] bg-cover bg-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 animate-size-pulse cursor-pointer'></div>

      <div className="h-1/2 w-full bg-white pl-4 p-24 overflow-hidden animateScrollUp">
        <h1 className="text-2xl md:text-6xl  font-poppins-bold text-brand  pl-4 pt-4 md:pt-4 md:pl-4">
          For a strong and
        </h1>
        <h1 className="text-2xl md:text-6xl  font-poppins-bold text-brand  pl-4 pt-4 md:pt-4 md:pl-4">
          a happier you 
        </h1>
        <p className='text-md md:text-xl pt-4 text-gray-500 pl-4 w-full md:w-2/5 font-poppins   '>
          Connect with therapists or friends, share your thoughts
        </p>
      </div>
      <div className="h-1/2 w-full bg-white pb-12 pr-4 md:p-24 overflow-hidden flex flex-col justify-end items-end animateScrollDown">
        <p className='text-md md:text-xl text-gray-500 text-end p-4 md:p-0 w-full md:w-2/5 font-poppins   '>
          Track your mental health and get support from the community.
        </p>
        
      </div>
    </div>
  );
}

export default Home
