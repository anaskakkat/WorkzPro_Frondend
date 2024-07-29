// import React from 'react'

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { Navigate, Outlet } from "react-router-dom";

const WorkerPublicRoute: React.FC = () => {
  const workerInfo = useSelector((state: RootState) => state.workerInfo.workerInfo);

  return workerInfo ? <Navigate to="/worker" /> : <Outlet />;
};

export default WorkerPublicRoute;
