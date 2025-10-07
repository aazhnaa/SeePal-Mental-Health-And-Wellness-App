import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../assets/css/MoodCalender.css';
import { useMoodStore } from '../store/useMoodStore';
import { Loader } from 'lucide-react';

const MoodCalendar = () => {
  const { mood, isMoodFetching, getUserMood } = useMoodStore();
  const [moodMap, setMoodMap] = useState({});

  useEffect(() => {
    const fetchMood = async () => {
      try {
        await getUserMood();
      } catch (error) {
        console.log("error in fetching mood : ", error);
      }
    };
    fetchMood();
  }, []);

  // useEffect(() => {
  //   const moodByDate = {};
  //   mood.forEach((entry) => {
  //     const key = new Date(entry.date).toISOString().split("T")[0];
  //     moodByDate[key] = entry.mood;
  //   });
  //   setMoodMap(moodByDate);
  // }, [mood]);

  useEffect(() => {
    const moodByDate = {};
    mood.forEach((entry) => {
      // ✅ Add this check to skip invalid entries
      if (entry && entry.date) {
        const dateObj = new Date(entry.date);
        
        // Check if the created date is valid
        if (!isNaN(dateObj.getTime())) {
          const key = dateObj.toISOString().split("T")[0];
          moodByDate[key] = entry.mood;
        } else {
          // Log the problematic entry to help you debug your backend data
          console.warn("Skipping invalid date entry:", entry);
        }
      }
    });
    setMoodMap(moodByDate);
  }, [mood]);

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const key = date.toISOString().split("T")[0];
      const userMood = moodMap[key];
      return userMood ? `tile-${userMood.toLowerCase()}` : null;
    }
  };

  return (
    <>
      {isMoodFetching ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : (
        <div className="max-w-sm p-4 bg-base-100 rounded-box shadow-md border border-base-200">
          <Calendar tileClassName={tileClassName} className="w-full" />
        </div>
      )}
    </>
  );
};

export default MoodCalendar;
