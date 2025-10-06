import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import RoleSelection from "../components/RoleSelection";
import ClientForm from "../components/ClientForm";
import TherapistForm from "../components/TherapistForm";

import { Navigate, useNavigate } from "react-router-dom";

function Signup() {
  const { authUser } = useAuthStore();
  const [role, setRole] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = (selectedRole) => {
    setRole(selectedRole);
    setCurrentStep(1);
  };
  const handleBack = () => {
    setCurrentStep(0);
    setRole(null);
  };

  if (authUser) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div className="overflow-hidden w-full h-screen relative">
        <div
          className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${
            currentStep === 1 ? "-translate-x-1/2" : ""
          }`}
        >
          <div className="w-full flex items-center justify-center">
            <RoleSelection onNext={handleNext} />
          </div>

          <div className="w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {role === "therapist"
                    ? "Therapist"
                    : role === "client"
                    ? "Client"
                    : ""}{" "}
                  Sign Up
                </h2>

                {/* ✅ Back Button */}
                <button
                  className="text-blue-500 text-sm underline"
                  onClick={handleBack}
                >
                  ← Back
                </button>
              </div>

              {role === "therapist" ? <TherapistForm /> : <ClientForm />}

              <p className="mt-4 text-sm text-center text-gray-600">
                Already have an account?{" "}
                <span
                  className="text-blue-500 underline cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Log in
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
