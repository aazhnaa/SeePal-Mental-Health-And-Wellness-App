import React, { useState } from "react";
import { Sparkles } from "lucide-react"; // optional icon

const affirmations = [
  "You are capable of amazing things.",
  "Today is a fresh start.",
  "You are stronger than you think.",
  "You deserve kindness — especially from yourself.",
  "Your potential is limitless.",
  "Small steps every day lead to big changes.",
  "You are doing your best, and that’s enough.",
  "Breathe. You’ve got this.",
];

const PositiveAffirmation = () => {
  const getRandomAffirmation = () =>
    affirmations[Math.floor(Math.random() * affirmations.length)];

  const [quote, setQuote] = useState(getRandomAffirmation());

  return (
    <div className="max-w-sm p-4 bg-base-100 rounded-box shadow-md border border-base-200 flex flex-col justify-between h-full">
      <div className="text-center">
        <Sparkles className="mx-auto mb-2 text-brand" />
        <h2 className="text-lg font-semibold text-base-content">
          Positive Affirmation
        </h2>
        <p className="mt-2 text-base text-base-content/80 italic">"{quote}"</p>
      </div>

      <div className="text-right mt-4">
        <button
          className="btn btn-sm btn-outline outline-brand text-brand rounded-xl"
          onClick={() => setQuote(getRandomAffirmation())}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default PositiveAffirmation;
