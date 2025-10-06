import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useAuthStore } from '../store/useAuthStore'
import { Camera } from 'lucide-react'

const Settings = () => {
  const {authUser, checkAuth, updateProfile, isUpdatingProfile} = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null)  

  const [formData, setFormData] = useState({
    fullName:"",
    description:"",
    age:"",
    gender:""
  })

  useEffect(()=>{
    if(authUser){
      setFormData({
        fullName: authUser.fullName || "",
        description: authUser.description || "",
        age: authUser.age || "",
        gender: authUser.gender || "",
      });
      
    
    }
  },[authUser])

      useEffect(() => {
         checkAuth();
       }, [checkAuth]);
   

  const handleChange =(e)=>{
    const {name, value} = e.target
    setFormData((prev)=>({ ...prev, [name]:value}))
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    await updateProfile(formData)
  }

  const handleImageUpload=async(e)=>{
    const file = e.target.files[0];
    if(!file) return
    const reader = new FileReader()
    reader.onload = async()=>{
      const base64image = reader.result
      setSelectedImg(base64image)
      await updateProfile({profilePic:base64image})
    }
    reader.onerror=(err)=>{
      console.error("FileReader error:", err);
      toast.error("Failed to read the image file.");
    }
    reader.readAsDataURL(file)
  }
  return (
    <>
      <div className="flex min-h-screen bg-base-200">
        <Sidebar />
        {/* Main Content */}
        <div className="flex flex-row gap-2 p-6 w-full">
          <form className=" w-full" onSubmit={handleSubmit}>
            <h1 className="font-bold text-2xl">Edit Profile</h1>
            <div className="flex flex-row gap-12 mt-6 ">
              {/*Profile Pic */}
              <div className="w-fit h-fit relative">
                <div className="avatar">
                  <div className="w-28 rounded-full ring ring-brand ring-offset-base-100 ring-offset-2">
                    <img
                      src={selectedImg || authUser.profilePic || "./avatar.png"}
                      alt="Profile Preview"
                    />
                  </div>
                </div>
                {/* <Camera className="w-8 h-8 p-1 absolute bottom-0 right-0 bg-white rounded-full shadow-md hover:bg-slate-200 cursor-pointer" /> */}
                <label
                  htmlFor="avatar-upload"
                  className={`
                  absolute bottom-0 right-0 
                  bg-white hover:scale-105 hover:bg-gray-100
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
                >
                  <Camera className="w-5 h-5 text-brand" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>

              {/* Edit */}
              <div className="w-full flex flex-col gap-6">
                {/* Full Name */}
                <div className="flex flex-col gap-1">
                  <label className="label">
                    <span className="text-black">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder={authUser.fullName || "Full Name"}
                    value={formData.fullName}
                    onChange={handleChange}
                    className="rounded-md p-2 w-3/4 border-gray-300 border "
                  />
                </div>
                {/* Bio */}
                <div className="flex flex-col gap-1">
                  <label className="label">
                    <span className="text-black">About Me</span>
                  </label>
                  <input
                    name="description"
                    type="text"
                    placeholder={authUser.description || "About me"}
                    value={formData.description}
                    onChange={handleChange}
                    className="rounded-md p-2 w-3/4 border-gray-300 border "
                  />
                </div>

                {/* Gender */}
                <div className="flex flex-col gap-1">
                  <label className="label">
                    <span className="text-black">Gender</span>
                  </label>
                  <select
                    name="gender"
                    className="select select-bordered w-3/4"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option disabled>
                      {authUser.gender || "Select Gender"}
                    </option>
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Age */}
                <div className="flex flex-col gap-1">
                  <label className="label">
                    <span className="text-black">Age</span>
                  </label>
                  <input
                    type="text"
                    name="age"
                    placeholder={authUser.age || "Age"}
                    value={formData.age}
                    onChange={handleChange}
                    className="rounded-md p-2 w-3/4 border-gray-300 border "
                  />
                </div>

                {/* Submit Button             */}
                <button className="p-2 w-3/4 text-white font-bold hover:bg-dark_brand bg-brand rounded-lg">
                  Submit
                </button>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </>
  );
}

export default Settings
