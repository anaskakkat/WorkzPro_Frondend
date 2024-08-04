import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/User/HomePage";
import SignUpPage from "../pages/User/Signup";
import LoginPage from "../pages/User/LoginPage";
import Otp from "../pages/User/Otp";
import ProtectedRoute from "../components/protectedRoute.tsx/userProtectedRoute";
import PublicRoute from "../components/protectedRoute.tsx/PublicRoute";
import Service from "../components/User/servicesPage/Service";
import UserLayout from "../pages/User/UserLayout";

export const UserRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<UserLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* homeRoute */}
        <Route path="/" element={<HomePage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/services" element={<Service />} />
        </Route>
      </Route>
    </Routes>
  );
};
