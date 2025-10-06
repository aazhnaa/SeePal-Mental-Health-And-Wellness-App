import { Eye, EyeOff, Mail, Pen, Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const therapyOptions = [
  "Individual Therapy",
  "Relationship Therapy",
  "Family Therapy",
  "Child & Adolescent Therapy",
  "Trauma & PTSD Therapy",
  "Addiction & Recovery Therapy",
  "Grief & Loss Therapy",
  "Career / Work Stress Counseling",
  "Group Therapy / Support Groups"
];


const TherapistForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    const { username, email, password, licenseNumber, licenseDocument } = formData;
    if (username && email && password && licenseNumber && licenseDocument) {
      setCurrentStep(1);
    } 
  };

  const handleBack = () => {
    setCurrentStep(0);
  };

  const [showpassword, setShowpassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    licenseNumber: '',
    licenseDocument: '',
    therapyTypes:[]
  });

  const handleTherapyChange = (therapy) => {
    setFormData((prevFormData) => {
      const isSelected = prevFormData.therapyTypes.includes(therapy);
      let newTherapyTypes;
      if (isSelected) {
        newTherapyTypes = prevFormData.therapyTypes.filter(
          (item) => item !== therapy
        );
      } else {
        newTherapyTypes = [...prevFormData.therapyTypes, therapy];
      }
      return {
        ...prevFormData,
        therapyTypes: newTherapyTypes,
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFormData({ ...formData, licenseDocument: reader.result });
    }
    reader.onerror = (err) => {
      console.error("Error converting file to Base64:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const {signupTherapist} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await signupTherapist(formData);
    } catch (error) {
      console.log("error in therapist form : ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-fit max-w-md p-4">
        <form onSubmit={handleSubmit}>
          <div className="overflow-hidden w-full h-fit relative">
            <div
              className={`flex w-[200%] h-full transition-transform duration-500 ease-in-out ${
                currentStep === 1 ? "-translate-x-1/2" : ""
              }`}
            >
              {/* Page 1 : User details */}
              <div className="w-1/2 flex items-center justify-center p-2">
                <div className="form-control w-full gap-4">
                  {/* Username */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">username</span>
                    </label>
                    <div className="flex items-center gap-2 input input-bordered px-3">
                      <Pen className="w-5 h-5 text-brand" />
                      <input
                        type="text"
                        name="username"
                        placeholder="John Doe"
                        value={formData.username}
                        onChange={handleChange}
                        className="grow outline-none bg-transparent"
                        //required
                        autoComplete="username"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <div className="flex items-center gap-2 input input-bordered px-3">
                      <Mail className="w-5 h-5 text-brand" />
                      <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="grow outline-none bg-transparent"
                        //required
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <div className="relative flex items-center gap-2 input input-bordered px-3">
                      <Lock className="w-5 h-5 text-brand" />
                      <input
                        type={showpassword ? "text" : "password"}
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="grow outline-none bg-transparent"
                        //required
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowpassword(!showpassword)}
                      >
                        {showpassword ? (
                          <EyeOff className="h-5 w-5 text-brand" />
                        ) : (
                          <Eye className="h-5 w-5 text-brand" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* License Number */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">License Number</span>
                    </label>
                    <div className="flex items-center gap-2 input input-bordered px-3">
                      <svg
                        className="w-5 h-5 text-brand"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M3 4C3 2.89543 3.89543 2 5 2H19C20.1046 2 21 2.89543 21 4V20C21 21.1046 20.1046 22 19 22H5C3.89543 22 3 21.1046 3 20V4ZM6 6V8H18V6H6ZM6 10V12H18V10H6ZM6 14V16H14V14H6Z" />
                      </svg>
                      <input
                        type="text"
                        name="licenseNumber"
                        placeholder="License Number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className="grow outline-none bg-transparent"
                        //required
                      />
                    </div>
                  </div>

                  {/* License Document Upload */}
                  <div className="form-control flex flex-col">
                    <label className="label">
                      <span className="label-text">
                        Upload License Document
                      </span>
                    </label>
                    <input
                      type="file"
                      name="licenseDocument"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="file-input file-input-bordered grow outline-none bg-transparent"
                      //required
                    />
                  </div>

                  <button
                    type="button"
                    className="w-full mt-4 bg-brand btn text-white hover:bg-dark_brand"
                    onClick={handleNext}
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Page 2: Additional Details */}
              <div className="w-1/2 flex items-center justify-center p-2">
                <div className="form-control w-full gap-4">
                  <fieldset>
                    <legend className="text-lg font-semibold text-gray-800 mb-4">
                      What type of therapy do you provide?
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {therapyOptions.map((therapy) => (
                        <div key={therapy}>
                          {/* We hide the actual checkbox but use its state */}
                          <input
                            type="checkbox"
                            id={therapy}
                            value={therapy}
                            checked={formData.therapyTypes.includes(therapy)}
                            onChange={() => handleTherapyChange(therapy)}
                            className="hidden peer" // Hide the checkbox and mark it as a 'peer'
                          />

                          {/* This label is the clickable card, styled based on the peer's state */}
                          <label
                            htmlFor={therapy}
                            className="
            flex items-center justify-between w-full p-4 
            border-2 rounded-lg cursor-pointer
            transition-all duration-200 ease-in-out
            
            // Default (unchecked) state
            bg-white border-gray-200 text-gray-700
            hover:bg-gray-50 hover:border-gray-300
            
            // Styles for when the peer (checkbox) is checked
            peer-checked:bg-teal-500 peer-checked:border-teal-500 peer-checked:text-white
          "
                          >
                            <span className="font-medium">{therapy}</span>

                            {/* A checkmark icon that only appears when checked */}
                            <svg
                              className={`w-6 h-6 ${
                                formData.therapyTypes.includes(therapy)
                                  ? "block"
                                  : "hidden"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>

                  <div className="flex flex-col items-center gap-4 mt-4">
                    <button
                      type="button"
                      className="w-full btn"
                      onClick={handleBack}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand btn text-white hover:bg-dark_brand"
                    >
                      {isSubmitting ? "Submitting..." : "Create Account"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TherapistForm;