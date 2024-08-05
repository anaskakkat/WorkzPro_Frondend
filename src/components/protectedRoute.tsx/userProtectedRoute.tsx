import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store/store";
// import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
// import { removeUserInfo } from "../../redux/slices/userSlices";
const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  // console.log("ProtectedRoute:--", userInfo);
  if (!userInfo) {
    return <Navigate to="/login" />;
  }
  // if (userInfo.isBlocked) {
  //   console.log('isBlocked');
  //   toast.error("Your account has been blocked. Please contact support.");
  //   dispatch(removeUserInfo());
  //   return <Navigate to="/login" />;
  // }
  return <Outlet />;
};

export default ProtectedRoute;
