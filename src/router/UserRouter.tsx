import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/User/HomePage";
import SignUpPage from "../pages/User/Signup";
import LoginPage from "../pages/User/LoginPage";
import Otp from "../pages/User/Otp";
import ProtectedRoute from "../components/protectedRoute.tsx/userProtectedRoute";
import PublicRoute from "../components/protectedRoute.tsx/PublicRoute";

export const UserRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* homeRoute */}
      <Route path="/" element={<HomePage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}></Route>
    </Routes>
  );
};
