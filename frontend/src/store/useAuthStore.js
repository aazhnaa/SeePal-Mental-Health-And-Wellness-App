import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
//const BASE_URL =import.meta.env.MODE === "development"? 'http://localhost:8000':"/api"
const BASE_URL = import.meta.env.VITE_BACKEND_URL
import {io} from 'socket.io-client'

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,
    followers:[],
    followings:[],
    searchedUsers:[],
    user:null,

    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect()
    },

    connectSocket:()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            // query:{
            //     userId : authUser._id,  
            // }
            withCredentials: true 
        });
        socket.connect();
        set({socket:socket})

        //listen for online users
        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/api/check")
            set({authUser:res.data})
            //const {authUser} = get();
            //console.log("in checkAuth, user's id : ", authUser._id);
            get().connectSocket();
        } 
        catch (error) {
            console.log("error in checkAuth useAuthStore : ",error)
            set({authUser:null})
        }
        finally{
            set({isCheckingAuth:false})
        }
     },
    signup:async(data)=>{
        try {
            const res = await axiosInstance.post('/api/signup',data)
            get().connectSocket();
            set({authUser:res.data})
            toast.success("Account created successfully!")
        } catch (error) {
             toast.error(error.response.data.message)
             console.log("error in signup useAuthStore : ", error);
        }
    },
    signupTherapist:async(data)=>{
        try {
            const res = await axiosInstance.post('/api/signup/therapist',data)
            get().connectSocket();
            set({authUser:res.data})
            toast.success("Account created successfully!")
        } catch (error) {
             toast.error(error.response.data.message)
        }
    },
    login:async(data)=>{
        try {
            const res = await axiosInstance.post('/api/login',data)
            set({authUser:res.data})
            toast.success("Logged in successfully!")
            get().connectSocket();
        } catch (error) {
            //toast.error(error.response.data.message)
            console.log("error in login useAuthStore : ", error);
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post("/api/logout")
            set({authUser:null})
            toast.success("Loggout out successfully!")
            get().disconnectSocket();
        } catch (error) {
            //toast.error(error.response.data.message)
            console.log("error in logout useAuthStore : ", error);
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true})
        try {
            const res = await axiosInstance.put('/api/updateProfile',data)
            set({authUser:res.data})
            toast.success("Profile updated successfully!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isUpdatingProfile:false})
        }
    },
    getFollowers:async(userId)=>{
        try {            
            const res = await axiosInstance.get(`/api/followers/${userId}`)
            set({followers:res.data})
            
        } catch (error) {

            console.log('error in useAuthStore getFollowers function :', error)
        }
    },
    getFollowings:async(userId)=>{
        try {
            const res = await axiosInstance.get(`/api/followings/${userId}`)
            set({followings:res.data})
            const {followings} = get()
            console.log(followings)
        } catch (error) {
            console.log('error in useAuthStore getFollowings function :', error)
        }
    },
    followUser : async(userId)=>{
        try {
            const res = await axiosInstance.post(`/${userId}/follow`)
            console.log(res.data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    getUserByUsername : async(query)=>{
        try {
            const res = await axiosInstance.get(`/api/search?query=${query}`);
            set({searchedUsers:res.data})
        } catch (error) {
            console.log('error in getUserByUsername in useAuthStore : ', error);
        }
    },
    getUserById : async(userId) =>{
        try {
            const res = await axiosInstance.get(`/api/search/${userId}`); 
            set({user:res.data})
        } catch (error) {
             console.log('error in getUserById in useAuthStore : ', error);
        }
    }

    // isFollowing:async(userId)=>{
    //     try {
    //         console.log(get().followers)
    //     } catch (error) {
            
    //     }
    // }
}))