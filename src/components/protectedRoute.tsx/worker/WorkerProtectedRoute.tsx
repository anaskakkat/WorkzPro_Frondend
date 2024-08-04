
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../redux/store/store";


const WorkerProtectedRoute: React.FC = () => {
  const workerInfo = useSelector((state: RootState) => state.workerInfo.workerInfo);
  // console.log("ProtectedRoute:--", workerInfo);

  return workerInfo ? <Outlet /> : <Navigate to="/worker/login" />;
};

export default WorkerProtectedRoute;
