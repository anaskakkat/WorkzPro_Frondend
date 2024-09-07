import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useLocation } from "react-router-dom";

const ChatUser = () => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const workerId = location.state?.workerId;
  console.log("Worker ID for chat:", workerId._id);

  const handleChat = async () => {
    try {
        
    } catch (error) {
        
    }
  };

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add logic to send message
    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-100">
      <div className="flex w-full bg-white shadow-xl overflow-hidden">
        {/* Sidebar */}
        <div className="w-1/4 border-r border-gray-200 text-custom_navyBlue bg-blue-50 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <img
              className="w-10 h-10 rounded-full"
              src="/api/placeholder/40/40"
              alt="User avatar"
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            {/* Chat list item */}
            <div className="p-4 hover:bg-blue-100 cursor-pointer">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 rounded-full"
                  src="/api/placeholder/48/48"
                  alt="Contact avatar"
                />
                <div className="ml-4 flex-1 ">
                  <h3 className="text-sm font-semibold">Arun Gosh</h3>
                  <p className="text-xs text-gray-500 truncate">
                    Last message...
                  </p>
                </div>
                <span className="text-xs text-gray-400">12:45 PM</span>
              </div>
            </div>
            {/* Add more chat list items here */}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-200 flex items-center bg-blue-50">
            <img
              className="w-10 h-10 rounded-full"
              src="/api/placeholder/40/40"
              alt="Contact avatar"
            />
            <div className="ml-4">
              <h2 className="text- font-semibold">Arun Gosh</h2>
              <p className="text-xs text-gray-500">Online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {/* Received message */}
            <div className="flex items-end">
              <img
                className="w-8 h-8 rounded-full"
                src="/api/placeholder/32/32"
                alt="Contact avatar"
              />
              <div className="ml-2 bg-white rounded-b-xl p-3 max-w-xs shadow rounded-tr-xl">
                <p className="text-sm">Hello! How are you?</p>
              </div>
            </div>

            {/* Sent message */}
            <div className="flex items-end justify-end">
              <div className="mr-2 bg-blue-500 text-white rounded-b-xl rounded-tl-xl p-3 max-w-xs shadow">
                <p className="text-sm">
                  Hi there! I'm doing great, thanks for asking.
                </p>
              </div>
            </div>

            {/* Add more messages here */}
          </div>

          {/* Message input */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-200"
          >
            <div className="flex items-center">
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600"
              >
                <AttachFileIcon fontSize="small" />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 mx-4 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 mr-2"
              >
                <EmojiEmotionsIcon fontSize="small" />
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
              >
                <SendIcon fontSize="small" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
