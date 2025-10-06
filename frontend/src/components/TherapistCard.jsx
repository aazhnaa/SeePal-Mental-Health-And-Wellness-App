import React from 'react'
import { Link, NavLink } from 'react-router-dom';

const TherapistCard = ({therapist}) => {
  //console.log('in therapist card : ', therapist);
  return (
    <>
      <div
        className="m-2 w-[18rem] rounded-xl border  text-white  gap-1 items-end justify-end p-4 bg-cover bg-center h-[24rem] relative transition-transform duration-300 hover:scale-105 cursor-pointer"
        style={{ backgroundImage: `url(${therapist.profilePic || "./avatar.png"})`, backgroundSize: 'cover' }}
      >
        <div className='flex flex-col bg-black bg-opacity-25  rounded-lg p-2  gap-2 absolute bottom-0 m-4'>
          <h1 className="font-poppins-bold text-lg font-bold ">
            {therapist.fullName}
          </h1>
          <p className=" font-poppins text-sm">{therapist.licenseNumber}</p>
          <NavLink to={`/userProfile/${therapist._id}`}             
            className="btn bg-brand border-none text-white font-poppins rounded-lg hover:bg-dark_brand">
            View Profile
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default TherapistCard
