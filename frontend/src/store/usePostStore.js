import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';

export const usePostStore = create((set, get) => ({
    posts: [],
    isPostSending: false,
    arePostsLoading: false,
    areUserPostsLoading: false,
    userPosts: [],

    createPost: async (data) => {
        set({ isPostSending: true });
        try {
            // ✅ CHANGE: Added /api prefix
            const res = await axiosInstance.post('/api/posts/create', data);
            
            // This correctly adds the new post to the beginning of the list
            set(state => ({ posts: [res.data, ...state.posts] }));
            
            toast.success("Posted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create post.');
        } finally {
            set({ isPostSending: false });
        }
    },

    getAllPosts: async () => {
        set({ arePostsLoading: true });
        try {
            // ✅ CHANGE: Added /api prefix
            const res = await axiosInstance.get('/api/posts/allPosts');
            set({ posts: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch posts.');
        } finally {
            set({ arePostsLoading: false });
        }
    },

    getUserPost: async (id) => {
        set({ areUserPostsLoading: true });
        try {
            // ✅ CHANGE: Added /api prefix
            const res = await axiosInstance.get(`/api/posts/${id}`);
            set({ userPosts: res.data });
        } catch (error) {
            // ✅ CHANGE: Added user-facing error toast
            toast.error(error.response?.data?.message || 'Failed to fetch user posts.');
            console.log('error in getUserPost : ', error);
        } finally {
            set({ areUserPostsLoading: false });
        }
    }
}));