import { useState } from "react";
import WorkerChats from "./WorkerChats";
import WorkerChatsMessages from "./WorkerChatsMessages";
const WorkerChatsUi = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const handleChatSelection = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-100">
      <div className="flex w-full bg-white shadow-xl overflow-hidden">
        {/* Sidebar */}

        <WorkerChats onSelectChat={handleChatSelection} />

        {/* Chat area */}
        {selectedChatId ? (
          <WorkerChatsMessages chatId={selectedChatId} />
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerChatsUi;
