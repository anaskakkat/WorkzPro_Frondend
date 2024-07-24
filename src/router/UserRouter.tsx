import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/User/HomePage";
import SignUpPage from "../pages/User/Signup";
import LoginPage from "../pages/User/LoginPage";
import Otp from "../pages/User/Otp";

export const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/otp" element={<Otp />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
