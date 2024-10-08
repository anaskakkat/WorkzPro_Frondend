import { useEffect, useState } from "react";
import { createChat, fetchChats } from "../../../api/user";
import { useUserId } from "../../../redux/hooks/userSelectors";
import { useLocation } from "react-router-dom";
import { Chat } from "../../../types/Chats";

// Define types for chat data

const ChatsUi: React.FC<{
  onSelectChat: (_id: string) => void;
}> = ({ onSelectChat }) => {
  const location = useLocation();
  const workerId = location.state?.workerId as { name: string; _id: string };
  const userId = useUserId();
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  useEffect(() => {
    handleFetchChats();
  }, []);
  useEffect(() => {
    if (workerId && userId) {
      handleCreateChat();
      handleFetchChats();
    }
  }, [workerId, userId]);

  const handleCreateChat = async () => {
    try {
      await createChat(workerId?.name, userId, workerId?._id);
      // console.log("Chat creation response:", response);
    } catch (error) {
      console.log("Error creating chat:", error);
    }
  };

  const handleFetchChats = async () => {
    try {
      const response = await fetchChats(userId);
      setChats(response);
      // console.log("Chat fetch response:", response);
    } catch (error) {
      console.log("Error fetching chats:", error);
    }
  };

  const handleSelectChat = (chatId: string) => {
    // console.log("id-------",chatId);

    setActiveChatId(chatId);
    onSelectChat(chatId);
  };

  return (
    <div className="lg: w-1/4 border-r border-gray-200 text-custom_navyBlue bg-gray-100 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-300">
        {/* <img
          className="w-10 h-10 rounded-full"
          src="/api/placeholder/30/30"
          alt="User avatar"
        /> */}
        <span className="text-gray-9 font-semibold">Chats</span>
      </div>
      <div className="flex-1 overflow-y-auto ">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat._id}
              className={`p-4 cursor-pointer flex items-center  rounded m-1.5 ${
                activeChatId === chat._id ? "bg-blue-100" : "hover:bg-blue-100"
              }`}
              onClick={() => handleSelectChat(chat._id)}
            >
              {/* <img
                className="w-12 h-12 rounded-full"
                src="/api/placeholder/41/41"
                alt="Contact avatar"
              /> */}
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold capitalize">
                  {chat.recieverName}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {chat.messages.length > 0
                    ? chat.messages[chat.messages.length - 1].message
                    : "No messages yet"}
                </p>
              </div>
              <span className="text-xs text-gray-400">
                {new Date(chat.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No chats available</p>
        )}
      </div>
    </div>
  );
};

export default ChatsUi;
