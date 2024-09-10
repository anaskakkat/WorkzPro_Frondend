import React, { createContext, useEffect, useState } from "react";
import { useUserId, useWorkerId } from "../redux/hooks/userSelectors";
import { BACKEND_SERVER } from "../constants/constant_env";
import io, { Socket } from "socket.io-client";
import { Outlet } from "react-router-dom";
type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userId = useUserId();
  const workerId = useWorkerId();
  const [socketConnected, setSocketConnected] = useState(false);
  useEffect(() => {
    if (userId || workerId) {
      console.log("Connecting with userId:", userId, "and workerId:", workerId); // Add logging

      const socketInstance = io(BACKEND_SERVER, {
        query: {
          userId: userId || "",
          workerId: workerId || "",
        },
      });

      setSocket(socketInstance);

      socketInstance.emit("setup", userId);
      socketInstance.on("connection", () => setSocketConnected(true));

      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    }
  }, [userId, workerId]);
  // console.log("socket--------", socket);

  return (
    <SocketContext.Provider value={{ socket }}>
      <Outlet />
    </SocketContext.Provider>
  );
};

export { SocketContext };
