import { useContext, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { fetchMessages, sendMessage } from "../../../api/user";
import { useUserId } from "../../../redux/hooks/userSelectors";
import { SocketContext } from "../../../context/socketContext";

interface MessageUiProps {
  chatId: string;
  senderId:string
}

export interface Message {
  chatId: string;
  _id?: string;
  sender: string;
  receiver: string | null;
  message: string;
}

const MessageUi: React.FC<MessageUiProps> = ({ chatId,senderId}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = useUserId();
  const [receiverId, setReceiverId] = useState<string | null>(null);
  const [workerName, setWorkerName] = useState("");
  const socketContext = useContext(SocketContext);
  const socket = socketContext?.socket;

  // Ref to track the last message
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  console.log(chatId,"kjkjkjkj");
  
  // useEffect(() => {
  //   socket?.on("newMessage", (newMessage: Message) => {
  //     console.log(
  //       senderId,newMessage.receiver,"jhjhsjhsjshjshsjhs"
  //       )
  //     console.log("new message user",chatId,userId, "side---", newMessage);
  //     // const message=newMessage.message
     
  //     if(chatId==newMessage.chatId){
        
  //       console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
  //       setMessages((prevMessages) => [...prevMessages,newMessage]);
       
  //     } 
    
  //   });
  // }, []);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      console.log(senderId, newMessage.receiver, "Checking newMessage receiver");
      console.log("New message received on user side", chatId, userId, newMessage);
  
      // Ensure the message is for the current chatId
      if (chatId === newMessage.chatId) {
        console.log("Message belongs to the current chat");
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    };
  
    // Attach the listener for the newMessage event
    socket?.on("newMessage", handleNewMessage);
  
    // Cleanup listener when chatId changes or component unmounts
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [chatId, socket]); // Ensure chatId and socket are in the dependency array
  

  useEffect(() => {
    if (chatId) {
      console.log(chatId,"fetching time anase")
      handleFetchMessages(chatId);
    }
  }, [chatId]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleFetchMessages = async (chatId: string) => {
    setLoading(true);
    try {
      const response = await fetchMessages(chatId);
      setWorkerName(response.recieverName);
      setMessages(response.messages);
      setReceiverId(response.participants[1]);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    try {
      const newMessage = {
        chatId,
        sender: userId,
        receiver: receiverId,
        message,
      };
      const response = await sendMessage(newMessage);
      setMessages((prevMessages) => [...prevMessages, response]);
      socket?.emit("sendMessage", response);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-gray-200 flex items-center bg-blue-50">
        <div className="ml-4">
          <h2 className="font-semibold capitalize">{workerName}</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      {/* Adjusted message container */}
      <div
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-blue-50 custom-scroll"
        style={{ height: "calc(100vh - 200px)", overflow: "auto" }}
      >
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex ${
                msg.sender === userId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  msg.sender === userId
                    ? "bg-blue-500 text-white rounded-tl-lg rounded-br-lg rounded-b-lg lg:min-w-40"
                    : "bg-white text-gray-800 rounded-tr-xl rounded-bl-lg rounded-br-lg lg:min-w-40"
                } p-3 max-w-xs lg:max-w-md shadow-md`}
              >
                <p className="text-sm">{msg.message}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

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

export default MessageUi;
