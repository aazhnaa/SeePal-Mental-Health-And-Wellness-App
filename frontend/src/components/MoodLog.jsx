import React, { useEffect, useState } from "react";
import { todaysDate } from "../lib/utils";
import { useMoodStore } from "../store/useMoodStore";

const MoodLog = () => {
  const [currMood, setCurrMood] = useState("");
  const { selectedMood, setSelectedMood, addMood, getTodayMood } =
    useMoodStore();
  //console.log("selectedMood : ", selectedMood);
  const today_date = todaysDate();
  useEffect(() => {
    getTodayMood(); // fetch today's mood when component loads
  }, [getTodayMood]);

  useEffect(() => {
    if (selectedMood && selectedMood.mood) {
      setCurrMood(selectedMood.mood);
    }
  }, [selectedMood]);
  

  const handleMoodSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!currMood.trim()) return;
      await addMood({ mood: currMood.trim() });
    } catch (error) {
      console.log("error while submitting mood : ", error);
    }
  };
  return (
    <>
      <div className="w-full h-fit flex flex-col items-center border-b mt-10 pb-10 ">
        <h1 className="font-bold text-brand text-3xl font-poppins-bold">
          How are you feeling today?
        </h1>
        <h2 className="text-lg font-bold">
          Date : <span className="font-normal text-gray-600">{today_date}</span>
        </h2>

        <form
          onSubmit={handleMoodSubmit}
          className="flex flex-col gap-2 pt-4 justify-center items-center w-full  "
        >
          <div
            onClick={() => setCurrMood("Excellent")}
            data-mood="Excellent"
            className={`rounded-xl w-full border flex cursor-pointer hover:bg-gray-100 ${
              currMood === "Excellent" ? "bg-gray-200 shadow-inner" : ""
            } transition duration-300 hover:shadow-inner justify-between  items-center p-4`}
          >
            <p className="font-poppins text-brand text-lg">Excellent 😃</p>
          </div>
          <div
            onClick={() => setCurrMood("Happy")}
            data-mood="Happy"
            className={`rounded-xl w-full border flex cursor-pointer hover:bg-gray-100 ${
              currMood === "Happy" ? "bg-gray-200 shadow-inner" : ""
            } transition duration-300 hover:shadow-inner justify-between  items-center p-4`}
          >
            <p className="font-poppins text-brand text-lg">Happy 🙂</p>
          </div>
          <div
            onClick={() => setCurrMood("Calm")}
            data-mood="Calm"
            className={`rounded-xl w-full border flex cursor-pointer hover:bg-gray-100 ${
              currMood === "Calm" ? "bg-gray-200 shadow-inner" : ""
            } transition duration-300 hover:shadow-inner justify-between  items-center p-4`}
          >
            <p className="font-poppins text-brand text-lg">Calm 😌</p>
          </div>
          <div
            onClick={() => setCurrMood("Sad")}
            data-mood="Sad"
            className={`rounded-xl w-full border flex cursor-pointer hover:bg-gray-100 ${
              currMood === "Sad" ? "bg-gray-200 shadow-inner" : ""
            } transition duration-300 hover:shadow-inner justify-between  items-center p-4`}
          >
            <p className="font-poppins text-brand text-lg">Sad ☹️</p>
          </div>
          <div
            onClick={() => setCurrMood("Depressed")}
            data-mood=""
            className={`rounded-xl w-full border flex cursor-pointer hover:bg-gray-100 ${
              currMood === "Depressed" ? "bg-gray-200 shadow-inner" : ""
            } transition duration-300 hover:shadow-inner justify-between  items-center p-4`}
          >
            <p className="font-poppins text-brand text-lg">Depressed 😞</p>
          </div>

          <button
            type="submit"
            className="p-4 bg-gradient-to-r w-1/2 rounded-xl text-white font-poppins hover:from-cyan-600 hover:to-dark_brand from-cyan-500 to-brand"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default MoodLog;
