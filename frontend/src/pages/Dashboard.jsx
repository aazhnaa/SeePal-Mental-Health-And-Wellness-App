import React, { useRef, useState, useEffect } from 'react'
import { Flame, Image, Loader, X } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';
import { usePostStore } from '../store/usePostStore';
import MoodChartsDaily from '../components/MoodChartsDaily';
import MoodCalendar from '../components/MoodCalendar';
import JournalEntry from '../components/JournalEntry';
import MoodLog from '../components/MoodLog';
import PositiveAffirmation from '../components/PositiveAffirmation';

const Dashboard = () => {
  const {authUser} = useAuthStore();
  return (
    <>
      <div className="h-full md:flex md:justify-center bg-white gap-4 p-4">
        <div className="w-1/4">
          <div>
            <div className="max-w-sm p-4 bg-base-100 rounded-box shadow-md border border-base-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="text-warning" />
                <span className="text-lg font-semibold text-base-content">
                  Streak
                </span>
              </div>
              <div className="text-3xl font-bold text-warning">{authUser.currentStreak}</div>
            </div>
          </div>
          <MoodLog />
        </div>
        <div className="w-3/4 grid grid-rows-2 gap-8">
          <div className="grid grid-cols-3 gap-2">
            <MoodCalendar />
            <JournalEntry />
            <PositiveAffirmation />
          </div>
          <div className="shadow-md">
            <MoodChartsDaily />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard
