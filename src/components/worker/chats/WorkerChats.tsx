import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useWorkerId } from "../../../redux/hooks/userSelectors";
import { createChat, fetchChats } from "../../../api/worker";

interface WorkerChatsProps {
  onSelectChat: (chatId: string) => void;
  setUserName: (name: string) => void; 
}

const WorkerChats: React.FC<WorkerChatsProps> = ({ onSelectChat, setUserName }) => {
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const location = useLocation();
  const userId = location.state?.userId;
  const workerId = useWorkerId();

  useEffect(() => {
    handleFetchChats();
    if (workerId && userId) {
      handleCreateChat();
    }
  }, [workerId, userId]);

  const handleCreateChat = async () => {
    try {
      await createChat(userId?.userName, userId._id, workerId);
    } catch (error) {
      console.log("Error creating chat:", error);
    }
  };

  const handleFetchChats = async () => {
    try {
      const response = await fetchChats(workerId);
      setChats(response);
      console.log("Chat fetch response:", response);
    } catch (error) {
      console.log("Error fetching chats:", error);
    }
  };

  const handleSelectChat = (chatId: string, chatName: string) => {
    setActiveChatId(chatId);
    onSelectChat(chatId);
    setUserName(chatName);
  };

  return (
    <div className="w-1/4 border-r border-gray-200 text-custom_navyBlue bg-blue-50 flex flex-col">
      <div className="p-4 border-b border-gray-200">Chats</div>
      <div className="flex-1 overflow-y-auto">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div
              key={chat.name}
              className={`p-4 cursor-pointer flex items-center ${
                activeChatId === chat.chatId._id ? "bg-blue-100" : "hover:bg-blue-100"
              }`}
              onClick={() => handleSelectChat(chat.chatId._id, chat.name)} 
            >
              <div className="ml-4 flex-1">
                <h3 className="text-sm font-semibold capitalize">{chat.name}</h3>
              </div>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-gray-500">No chats available</p>
        )}
      </div>
    </div>
  );
};

export default WorkerChats;
