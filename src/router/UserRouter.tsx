import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/User/HomePage";
import SignUpPage from "../pages/User/Signup";
import LoginPage from "../pages/User/LoginPage";
import Otp from "../pages/User/Otp";
import ProtectedRoute from "../components/protectedRoute.tsx/userProtectedRoute";
import PublicRoute from "../components/protectedRoute.tsx/PublicRoute";
import Service from "../components/User/servicesPage/Service";
import UserLayout from "../pages/User/UserLayout";
import InterceptorSetup from "../config/axiosInterceptors";
import WorkersNearby from "../pages/User/WorkersNearby";
import DeatilsWorker from "../pages/User/DeatilsWorker";
import WorkerCheckout from "../pages/User/WorkerCheckout";
import Demo from "../components/Demo";
import BookingSuccess from "../pages/User/BookingSuccess";
import UserProfile from "../pages/User/UserProfile";

export const UserRouter = () => {
  return (
    <InterceptorSetup>
      <Routes>
        {/* Public routes */}

        <Route element={<PublicRoute />}>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="/" element={<UserLayout />}>
          {/* homeRoute */}
          <Route path="/" element={<HomePage />} />
          <Route path="/demo" element={<Demo />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/services" element={<Service />} />
            <Route path="/workersNearby" element={<WorkersNearby />} />
            <Route
              path="/WorkerDetails/:workerId"
              element={<DeatilsWorker />}
            />
          </Route>
          <Route
            path="/workerCheckout/:workerId"
            element={<WorkerCheckout />}
          />
          <Route path="/success/:id" element={<BookingSuccess />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/bookings" element={<UserProfile />} />
        </Route>
      </Routes>
    </InterceptorSetup>
  );
};
