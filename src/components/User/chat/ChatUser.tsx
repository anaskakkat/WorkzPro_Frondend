import { useState } from "react";
import ChatsUi from "./ChatsUi";
import MessageUi from "./MessageUi";

const ChatUser = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  const handleChatSelection = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex bg-gray-100">
      <div className="flex w-full bg-white shadow-xl overflow-hidden">
        {/* Sidebar: pass the handler to ChatsUi */}
        <ChatsUi onSelectChat={handleChatSelection} />

        {/* Chat area: pass the selectedChatId to MessageUi */}
        {selectedChatId ? (
          <MessageUi chatId={selectedChatId} />
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatUser;
