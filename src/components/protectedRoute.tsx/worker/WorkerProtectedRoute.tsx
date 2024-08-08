// components/protectedRoute.tsx/worker/WorkerProtectedRoute.tsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../redux/store/store";

const WorkerProtectedRoute: React.FC = () => {
  const workerInfo = useSelector((state: RootState) => state.workerInfo);
  const isProfileSetup = workerInfo.workerInfo?.isProfileSetup;
  const isLoggedIn = !!workerInfo;
  // console.log("workerInfo:",workerInfo);

  // console.log("worker_protected--", "-isProfileSetup--", isProfileSetup);
  if (!isProfileSetup) {
    return <Navigate to="/worker/profile_setup" />;
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/worker/login" />;
  }


  return <Outlet />;
};

export default WorkerProtectedRoute;
