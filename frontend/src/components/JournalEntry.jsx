import React, { useRef, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from 'react-hot-toast';
import {Image, X} from 'lucide-react';

const JournalEntry =()=>{
  const [entry, setEntry] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImagePreview = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSaveEntry = async() =>{
    if(!entry.trim()){
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post('/entry', {text:entry, image:imagePreview});
      toast.success("entry saved!");
      setEntry("");
    } catch (error) {
      console.error("Failed to save entry:", error);
      toast.error(error.response.data.message);
    }
    finally{
      setLoading(false);
      setImagePreview(null);
    }
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="max-w-sm flex flex-col justify-between p-4 bg-base-100 rounded-box shadow-md border border-base-200">
      <textarea
        className="textarea text-brand bg-inherit border-none focus:ring-0 focus:outline-none textarea-lg w-full h-48 resize-none mb-4"
        placeholder="Today I felt..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <div className="flex flex-col">
        {imagePreview && (
              <div className="mb-3 flex items-center gap-2 ">
                <div className="relative">
                  <img
                    src={imagePreview || "./avatar.png"}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                  />
                  <button
                    onClick={removeImagePreview}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                    type="button"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </div>
            )}
        <div className="flex flex-row justify-between">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className=" "
          >
            <Image className="w-10 h-10 text-brand" />
          </button>
          <button
            className="btn-md bg-brand text-white hover:bg-dark_brand btn rounded-xl"
            onClick={handleSaveEntry}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
        </div>
      </div>
    </div>
  );
}
export default JournalEntry



