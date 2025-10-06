import {create} from 'zustand';
import {toast} from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import axios from 'axios';

export const usePostStore = create((set,get)=>({
    posts:[],
    isPostSending:false,
    arePostsLoading:false,
    areUserPostsLoading:false,
    userPosts:[],

    createPost:async(data)=>{
        set({isPostSending:true})
        try {
            const res = await axiosInstance.post('/posts/create',data);
            const currentPosts = get().posts; 
            set({ posts: [res.data, ...currentPosts] });
            toast.success("posted successfully!")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isPostSending:false})
        }
    },

    getAllPosts:async()=>{
        set({arePostsLoading:true})
        try {
            const res = await axiosInstance.get('/posts/allPosts');
            set({posts:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({arePostsLoading:false})
        }
    },
    

    getUserPost:async(id)=>{
        set({areUserPostsLoading:true})
        try {
            //console.log("user's id : ", id);
            const res = await axiosInstance.get(`/posts/${id}`)
            set({userPosts:res.data})
        } catch (error) {
            console.log('error in getUserPost : ', error);
        }
        finally{
            set({areUserPostsLoading:false})
        }
    }
}))