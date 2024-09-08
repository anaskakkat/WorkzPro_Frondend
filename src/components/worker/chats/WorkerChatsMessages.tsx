import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { fetchMessages } from "../../../api/worker";
// import { useLocation } from "react-router-dom";
interface MessageUiProps {
  chatId: string;
}

const WorkerChatsMessages: React.FC<MessageUiProps> = ({ chatId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  console.log("chatId-----:", chatId);

  const handleSendMessage = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Add logic to send message
    setMessage("");
  };
  useEffect(() => {
    if (chatId) {
      handleFetchMessages(chatId);
    }
  }, [chatId]);

  const handleFetchMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await fetchMessages(chatId);
      // console.log("rsrp-------", response);
      //   setWorkerName(response.recieverName);
      //   setMessages(response.messages);
      //   setReceiverId(response.participants[1]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-200 flex items-center bg-blue-50">
        {/* <img
          className="w-10 h-10 rounded-full"
          src="/api/placeholder/40/40"
          alt="Contact avatar"
        /> */}
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
          <button type="button" className="text-gray-400 hover:text-gray-600">
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
  );
};

export default WorkerChatsMessages;
