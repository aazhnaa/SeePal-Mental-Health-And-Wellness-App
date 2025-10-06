import React, { useState } from 'react';

const RoleSelection = ({ onNext }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleNext = () => {
    if (!selectedRole) {
      alert('Please select a role before continuing.');
      return;
    }
    onNext(selectedRole);
  };

  return (
    <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign up as</h2>

      <div className="flex flex-col gap-4 mb-6">
        <button
          className={`py-2 px-4 hover:bg-gray-200  rounded-lg ${
            selectedRole === 'client'
              ? 'bg-gray-200 text-black'
              : 'bg-white text-gray-800 border-gray-300'
          }`}
          onClick={() => setSelectedRole('client')}
        >
          Client
        </button>

        <button
          className={`py-2 px-4 hover:bg-gray-200 rounded-lg ${
            selectedRole === 'therapist'
              ? 'bg-gray-200 text-black'
              : 'bg-white text-gray-800 border-gray-300'
          }`}
          onClick={() => setSelectedRole('therapist')}
        >
          Therapist
        </button>
      </div>

      <button
        className="w-full bg-brand text-white py-2 px-4 rounded-lg hover:bg-dark_brand transition"
        onClick={handleNext}
      >
        Next →
      </button>

      <p className="mt-4 text-sm text-gray-600">
        Already have an account? <a href="/login" className="text-blue-500 underline">Log in</a>
      </p>
    </div>
  );
};

export default RoleSelection;
