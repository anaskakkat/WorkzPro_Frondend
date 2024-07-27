import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store/store";

const PublicRoute: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);

  return userInfo ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
