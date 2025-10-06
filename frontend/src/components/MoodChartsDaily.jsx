import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect, useState, useMemo } from "react";
import { startOfWeek, endOfWeek, isWithinInterval, addWeeks, format } from "date-fns";
import { useMoodStore } from "../store/useMoodStore";
import { Loader } from "lucide-react";
import { editMood, findScore, moodDay } from "../lib/utils.js";

const weekDays = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

const MoodChartsDaily = () => {
  const { mood, isMoodFetching, getUserMood } = useMoodStore();
  const [weekOffset, setWeekOffset] = useState(0);
  useEffect(() => {
    const fetchMood = async () => {
      //console.log("fetching mood in frontend")
      try {
        await getUserMood();
      } catch (error) {
        console.log("error in fetching mood : ", error);
      }
      finally{
        //console.log(mood);
      }
      //console.log(mood);
    };
    fetchMood();
  }, []);

  const { weekStart, weekEnd, weekLabel } = useMemo(() => {
    const shifted = addWeeks(new Date(), weekOffset);
    const start = startOfWeek(shifted, { weekStartsOn: 1 });
    const end = endOfWeek(shifted, { weekStartsOn: 1 });    
    const label = `${format(start, "MMM d")} – ${format(end, "MMM d")}`;
    //console.log("label : ", start);
    return { weekStart: start, weekEnd: end, weekLabel: label };
  }, [weekOffset]);
  
   const chartData = useMemo(() => {
    //console.log("mood",mood)
    const currentWeekMoods = mood.filter((entry) =>
      isWithinInterval(new Date(entry.date), { start: weekStart, end: weekEnd })
    );
    //console.log("current week : ",currentWeekMoods)
    const moodMap = currentWeekMoods.reduce((acc, entry) => {
      const day = moodDay(entry.date); 
      acc[day] = {
        mood: editMood(entry.mood),
        score: findScore(entry.mood),
      };
      return acc;
    }, {});
    //console.log("mood map : ", moodMap)
    return weekDays.map((day) => ({
      name: day,
      mood: moodMap[day]?.mood || "None",
      score: moodMap[day]?.score || 0,
    }));
  }, [mood, weekStart, weekEnd]);

  // Prevent navigating into the future (beyond current week)
  const disableNext = weekOffset >= 0;

  //console.log(chartData)

  
  return (
    <>
      {isMoodFetching ? (
        <>
          <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin" />
          </div>
        </>
      ) : (
        <div className="w-full h-80">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setWeekOffset((p) => p - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            >
              ◀ Prev
            </button>

            <div className="text-sm sm:text-base font-semibold">
              {weekLabel} {weekOffset === 0 && <span>(Current Week)</span>}
            </div>

            <button
              onClick={() => setWeekOffset((p) => p + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              disabled={disableNext}
            >
              Next ▶
            </button>
          </div>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ right: 30 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#74c0fc" stopOpacity={1} />
                  <stop offset="100%" stopColor="#006d77" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 5]} />
              <Tooltip
                formatter={(value) => `Score: ${value}`}
                labelFormatter={(_, payload) => `Mood: ${payload[0]?.payload.mood}`}
              />
              <Legend />
              <Bar dataKey="score" fill="url(#barGradient)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default MoodChartsDaily;
