import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store/store";



const ProtectedRoute: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  console.log("ProtectedRoute:--", userInfo);

  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
