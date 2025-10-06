import { Image, Send, X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useRef, useState } from "react";

function MessageInput() {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

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
     if(fileInputRef.current) fileInputRef.current.value = "";
    }
    
    const handleSendMessage = async(e) => {
      e.preventDefault();
      if(!text.trim() && !imagePreview) return;
      try {
        await sendMessage({
          text:text.trim(),
          image:imagePreview,
        });

        setText("");
        setImagePreview(null);
      } catch (error) {
        console.error("error sending message:", error);
      }
    }
  return (
    <div className="flex flex-col gap-2 p-2 bg-base-100 ">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2 ">
          <div className="relative">
            <img
              src={imagePreview}
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
      {/* Image Upload Button */}
      <form
        className="flex items-center gap-2 p-2 bg-base-100 w-full rounded-sm shadow-inner"
        onSubmit={handleSendMessage}
      >
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
          className={` flex btn btn-circle ${
            imagePreview ? "text-black" : "text-brand"
          } hover:text-brand`}
        >
          <Image className="w-6 h-6 text-brand hover:text-dark_brand" />
        </button>

        {/* Text Input */}
        <input
          type="text"
          value={text}
          placeholder="Type your message..."
          className="input input-bordered flex-1 w-full"
          onChange={(e) => setText(e.target.value)}
        />

        {/* Send Button */}
        <button
          className="btn border-none text-brand btn-sm"
          type="submit"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default MessageInput;
