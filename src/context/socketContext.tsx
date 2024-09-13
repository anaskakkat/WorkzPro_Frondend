import React, { createContext, useEffect, useState } from "react";
import { useUserId, useWorkerId } from "../redux/hooks/userSelectors";
import { BACKEND_SERVER } from "../constants/constant_env";
import io, { Socket } from "socket.io-client";
import { Outlet } from "react-router-dom";

type SocketContextType = {
  socket: Socket | null;
  onlineUsers: any[];
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userId = useUserId();
  const workerId = useWorkerId();

  useEffect(() => {
    if (userId || workerId) {
      console.log("Connecting with userId:", userId, "and workerId:", workerId);

      const socket = io(BACKEND_SERVER, {
        query: {
          userId: userId || "",
          workerId: workerId || "",
        },
      });

      setSocket(socket);

      socket.on("connection", () => {
        console.log("Connected to socket server");
      });

      socket.emit("addUser", userId || workerId);

      socket.on("getUsers", (users) => {
        console.log("Received updated user list:", users);
        setOnlineUsers(users);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      return () => {
        socket.disconnect();
        setSocket(null);
      };
    }
  }, [userId, workerId]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      <Outlet />
    </SocketContext.Provider>
  );
};

export { SocketContext };
