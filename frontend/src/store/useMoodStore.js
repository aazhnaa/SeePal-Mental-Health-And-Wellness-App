import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useMoodStore = create((set, get) => ({
    selectedMood: '',
    mood: [],
    isMoodFetching: false,

    setSelectedMood: (mood) => {
        set({ selectedMood: mood });
    },

    addMood: async (mood) => {
        try {
            // ✅ CHANGE: Added /api prefix
            const res = await axiosInstance.post('/api/mood/', mood);
            set(state => ({ mood: [...state.mood, res.data] }));
            
            toast.success(`Mood saved`);
        } catch (error) {
            //toast.error(error.response?.data?.message || 'Failed to save mood.');
            console.log("error in addMood: ", error);
        }
    },

    getUserMood: async () => {
        set({ isMoodFetching: true });
        try {
            // ✅ CHANGE: Added /api prefix
            const res = await axiosInstance.get('/api/mood/');
            set({ mood: res.data });
        } catch (error) {
            //toast.error(error.response?.data?.message || 'Failed to fetch mood history.');
            console.log("error in getUserMood: ", error);
        } finally {
            set({ isMoodFetching: false });
        }
    },

    getTodayMood: async () => {
        try {
            // ✅ CHANGE: Added /api prefix
            const res = await axiosInstance.get("/api/mood/today");
            set({ selectedMood: res.data });
        } catch (error) {
            // This error can be silent if no mood is found for today, which is normal.
            if (error.response?.status !== 404) {
                 //toast.error(error.response?.data?.message || 'Failed to fetch today\'s mood.');
                 console.log("error in getTodayMood: ", error);
            }
            console.log("error in getTodayMood: ", error);
        }
    }
}));