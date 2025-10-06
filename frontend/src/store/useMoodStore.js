import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

export const useMoodStore = create((set,get)=>({
    selectedMood:'',
    mood:[],
    isMoodFetching:false,

    setSelectedMood:(mood)=>{
        set({selectedMood:mood})
    },

    addMood:async(mood)=>{
        try {
            const res = await axiosInstance.post('/mood/',mood)
            toast.success(`Mood saved`);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    getUserMood : async()=>{
        set({isMoodFetching:true})
        //console.log("Axios request to:", axiosInstance.defaults.baseURL + '/mood/');
        try {
            const res = await axiosInstance.get('/mood/')
            set({mood:res.data})
            
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in getUserMood: ", error);
        }
        finally{
            //console.log("mood fetching process completed : ", get().mood);
            set({isMoodFetching:false})
        }
    },

    getTodayMood : async() =>{
        try {
            const res = await axiosInstance.get("/mood/today");
            set({selectedMood:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("error in getUserMood: ", error);
        }
    }
}))
