import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store/store";

const ProtectedRoute: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  if (!userInfo) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
