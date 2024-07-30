import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../redux/store/store";

const PublicRouteAdmin: React.FC = () => {
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo.adminInfo
  );

  return adminInfo ? <Navigate to="/admin" /> : <Outlet />;
};

export default PublicRouteAdmin;
