// import React, { useRef, useState, useEffect } from "react";
// import { Flame, Image, Loader, X } from "lucide-react";
// import { useAuthStore } from "../store/useAuthStore";
// import { usePostStore } from "../store/usePostStore";
// import MoodChartsDaily from "../components/MoodChartsDaily";
// import MoodCalendar from "../components/MoodCalendar";
// import JournalEntry from "../components/JournalEntry";
// import MoodLog from "../components/MoodLog";
// import PositiveAffirmation from "../components/PositiveAffirmation";

// const Dashboard = () => {
//   const { authUser } = useAuthStore();
//   return (
//     <>
//       <div className="h-full md:flex md:justify-center bg-white gap-4 p-4">
//         <div className="mood-log w-1/4">
//             <div className="streak-area  max-w-sm p-4 bg-base-100 rounded-box shadow-md border border-base-200 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Flame className="text-warning" />
//                 <span className="text-lg font-semibold text-base-content">
//                   Streak
//                 </span>
//               </div>
//               <div className="text-3xl font-bold text-warning">
//                 {authUser.currentStreak}
//               </div>
//             </div>
//           <MoodLog />
//         </div>

//         <div className="w-3/4 grid grid-rows-2 gap-8">
//           <div className="grid grid-cols-3 gap-2">
//             <JournalEntry />
//             <MoodCalendar />
//             <PositiveAffirmation />
//           </div>
//           <div className="shadow-md">
//             <MoodChartsDaily />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import React from "react";
import { Flame } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import MoodChartsDaily from "../components/MoodChartsDaily";
import MoodCalendar from "../components/MoodCalendar";
import JournalEntry from "../components/JournalEntry";
import MoodLog from "../components/MoodLog";
import PositiveAffirmation from "../components/PositiveAffirmation";

const Dashboard = () => {
  const { authUser } = useAuthStore();
  return (
    <>
      {/* MAIN CONTAINER:
        - On mobile (default): flex-col to stack the sidebar and main content vertically.
        - On medium screens and up (md:): flex-row for a side-by-side layout.
      */}
      <div className="h-full flex flex-col md:flex-row bg-white gap-4 p-4">
        {/* LEFT SIDEBAR:
          - On mobile: w-full to take up the full width.
          - On medium screens: md:w-1/4 to take up 25% of the width.
          - flex flex-col gap-4 to space out the streak and mood log components.
        */}
        <div className="mood-log w-full md:w-1/4 flex flex-col gap-4">
          <div className="streak-area max-w-sm p-4 bg-base-100 rounded-box shadow-md border border-base-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="text-warning" />
              <span className="text-lg font-semibold text-base-content">
                Streak
              </span>
            </div>
            <div className="text-3xl font-bold text-warning">
              {authUser.currentStreak}
            </div>
          </div>
          <MoodLog />
        </div>

        {/* RIGHT MAIN CONTENT:
          - On mobile: w-full to take up the full width.
          - On medium screens: md:w-3/4 to take up the remaining 75%.
          - flex flex-col gap-8 to stack its children (the top grid and the bottom chart) vertically.
        */}
        <div className="w-full md:w-3/4 flex flex-col gap-8">
          {/* TOP CARDS GRID:
            - On mobile: grid-cols-1 to stack Journal, Calendar, and Affirmation.
            - On large screens (lg:): grid-cols-3 to display them side-by-side.
            - Using 'lg:' instead of 'md:' gives a better layout on tablets.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <JournalEntry />
            <MoodCalendar />
            <PositiveAffirmation />
          </div>
          <div className="shadow-md">
            <MoodChartsDaily />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;