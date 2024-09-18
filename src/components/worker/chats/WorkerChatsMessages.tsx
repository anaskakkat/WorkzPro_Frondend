import { useEffect, useState, useRef, useContext, ChangeEvent } from "react";
import SendIcon from "@mui/icons-material/Send";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { fetchMessages, sendMessage } from "../../../api/worker";
import { Message } from "../../User/chat/MessageUi";
import { useWorkerId } from "../../../redux/hooks/userSelectors";
import toast from "react-hot-toast";
import { SocketContext } from "../../../context/socketContext";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import {
  formatDateForChat,
  formatTimeForChat,
} from "../../../utils/chatHelperFunctions";

interface WorkerChatsMessagesProps {
  chatId: string;
  userName: string;
}

const WorkerChatsMessages: React.FC<WorkerChatsMessagesProps> = ({
  chatId,
  userName
}) => {
  const socketContext = useContext(SocketContext);
  const socket = socketContext?.socket;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const workerId = useWorkerId();
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  // console.log("------WorkerChatsMessages-----chatId---", chatId);
  const [lastSeen, setLastSeen] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!message.trim() && !selectedFile) {
      toast.error("Please type a message");
      return;
    }
    try {
      const newMessage = {
        chatId,
        sender: workerId,
        receiver: receiverId,
        message,
      };

      // Emit the message via socket for real-time updates

      const response = await sendMessage(newMessage);
      // console.log("response--", response);

      socket?.emit("sendMessage", response);
      setMessages((prevMessages) => [...prevMessages, response]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setMessage("");
  };

  useEffect(() => {
    handleFetchMessages();
  }, [chatId]);

  const handleFetchMessages = async () => {

    setLoading(true);
    try {
      const response = await fetchMessages(chatId);
      // console.log("------response-----fetchMessages---",response);

      setMessages(response.messages);
      setReceiverId(response.participants[0]);
      setLastSeen(response.lastSeen);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  // Listen for new messages from the socket
  useEffect(() => {
    socket?.on("newMessage", (newMessage: Message) => {
      console.log("new message worker side---", newMessage);
      if (chatId === newMessage.chatId) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });
  }, []);

  // // Scroll to the last message when messages update
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
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
          <h2 className="font-semibold capitalize">{userName}</h2>
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
                      msg.sender === workerId ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        msg.sender === workerId
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
        <div ref={lastMessageRef} />
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

export default WorkerChatsMessages;
