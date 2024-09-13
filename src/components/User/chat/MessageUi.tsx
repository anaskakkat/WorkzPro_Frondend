import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { fetchMessages, sendMessage } from "../../../api/user";
import { useUserId } from "../../../redux/hooks/userSelectors";
import { SocketContext } from "../../../context/socketContext";
import {
  formatDateForChat,
  formatTimeForChat,
} from "../../../utils/chatHelperFunctions";

interface MessageUiProps {
  chatId: string;
}

export interface Message {
  chatId: string;
  _id?: string;
  sender: string;
  receiver: string | null;
  message?: string;
  image?: string;
  timestamp?: string;
}

const MessageUi: React.FC<MessageUiProps> = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = useUserId();
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [workerName, setWorkerName] = useState("");
  const socketContext = useContext(SocketContext);
  const socket = socketContext?.socket;
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Ref to track the last message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      if (chatId === newMessage.chatId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
    socket?.on("newMessage", handleNewMessage);
  }, [chatId, socket]);

  useEffect(() => {
    if (chatId) {
      handleFetchMessages(chatId);
    }
  }, [chatId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFetchMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await fetchMessages(chatId);
      console.log("resppp---", response);

      setWorkerName(response.recieverName);
      setMessages(response.messages);
      setReceiverId(response.participants[1]);
      setLastSeen(response.lastSeen);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() && !selectedFile) return;
    const formData = new FormData();
    formData.append("chatId", chatId);
    formData.append("sender", userId);
    formData.append("receiver", receiverId!);
    if (message) formData.append("message", message);
    if (selectedFile) formData.append("image", selectedFile);
    try {
      const response = await sendMessage(formData);
      setMessages((prevMessages) => [...prevMessages, response]);
      socket?.emit("sendMessage", response);
      setMessage("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-200">
      <div className="p-4 border-b  flex items-center bg-gray-300">
        {/* <img
          className="w-10 rounded-full truncate"
          src="/api/placeholder/30/30"
          alt={workerName}
        /> */}
        <div className="ml-4">
          <h2 className="font-semibold capitalize">{workerName}</h2>
          {lastSeen && (
            <p className="text-xs text-gray-500">
              Last seen at {formatTimeForChat(lastSeen)}
            </p>
          )}
        </div>
      </div>

      {/* Adjusted message container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg- custom-scroll"
        style={{
          height: "calc(100vh - 200px)",
          overflow: "auto ",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          <>
            {messages.map((msg, index) => {
              const showDateHeader =
                index === 0 ||
                formatDateForChat(messages[index - 1].timestamp!) !==
                  formatDateForChat(msg.timestamp!);
              return (
                <div key={msg._id}>
                  {/* Date Header */}
                  {showDateHeader && (
                    <div className="text-center text-xs bg-gray-700 text-white my-2 rounded-lg p-2 w-fit mx-auto">
                      <span> {formatDateForChat(msg.timestamp!)}</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`flex ${
                      msg.sender === userId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        msg.sender === userId
                          ? "bg-blue-200 text-black rounded-tl-lg rounded-br-lg rounded-b-lg lg:min-w-40"
                          : "bg-white text-gray-800 rounded-tr-xl rounded-bl-lg rounded-br-lg lg:min-w-40"
                      } p-3 max-w-xs lg:max-w-md shadow-md`}
                    >
                      {msg.image ? (
                        <img
                          src={msg.image}
                          alt="Sent image"
                          className="max-w-40"
                        />
                      ) : (
                        <p className="text-sm">{msg.message}</p>
                      )}{" "}
                      <p className="text-xs text-right text-gray-500">
                        {formatTimeForChat(msg.timestamp!)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview Section */}
      {selectedFile && (
        <div className="flex items-center mt-2">
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="w-16 h-16 object-cover rounded-lg mr-4"
          />
          <button
            type="button"
            onClick={() => setSelectedFile(null)} // Clear the selected file
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="p-4  border border-gray-300"
      >
        <div className="flex items-center">
          <input
            type="file"
            accept="image/*"
            id="image-input"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            onClick={() => document.getElementById("image-input")?.click()}
          >
            <span className="text-black">
              {" "}
              <AddPhotoAlternateIcon fontSize="small" />
            </span>
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
            <span className="text-yellow-400">
              {" "}
              <EmojiEmotionsIcon fontSize="small" />
            </span>{" "}
          </button>

          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600"
            disabled={!message.trim() && !selectedFile}
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageUi;
