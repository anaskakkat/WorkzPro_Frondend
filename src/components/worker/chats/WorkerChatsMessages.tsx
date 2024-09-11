import { useEffect, useState, useRef, useContext } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { fetchMessages, sendMessage } from "../../../api/worker";
import { Message } from "../../User/chat/MessageUi";
import { useWorkerId } from "../../../redux/hooks/userSelectors";
import toast from "react-hot-toast";
import { SocketContext } from "../../../context/socketContext";
interface WorkerChatsMessagesProps {
  chatId: string;
  userName: string;
}

const WorkerChatsMessages: React.FC<WorkerChatsMessagesProps> = ({
  chatId,
  userName,
}) => {
  const socketContext = useContext(SocketContext);
  const socket = socketContext?.socket;
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const workerId = useWorkerId();
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!message.trim()) {
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
    if (chatId) {
      handleFetchMessages(chatId);
    }
  }, [chatId]);

  const handleFetchMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await fetchMessages(chatId);
      setMessages(response.messages);
      setReceiverId(response.participants[0]);
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

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    

  }, []);

  // // Scroll to the last message when messages update
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center bg-blue-50">
        <div className="ml-4">
          <h2 className="font-semibold capitalize">{userName}</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.sender === workerId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === workerId
                    ? "bg-blue-500 text-white rounded-tl-lg rounded-b-lg lg:min-w-40"
                    : "bg-white text-gray-800 rounded-tr-lg rounded-bl-lg rounded-br-lg lg:min-w-40"
                } p-3 max-w-xs shadow`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>

              {index === messages.length - 1 && <div ref={lastMessageRef} />}
            </div>
          ))
        )}
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
            disabled={!message.trim()}
          >
            <SendIcon fontSize="small" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkerChatsMessages;
