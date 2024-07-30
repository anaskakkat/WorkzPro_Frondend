import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../../redux/store/store";

const ProtectedRouteAdmin: React.FC = () => {
  const adminInfo = useSelector(
    (state: RootState) => state.adminInfo.adminInfo
  );
  console.log("ProtectedRouteAdmin:--", adminInfo);

  return adminInfo ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRouteAdmin;
