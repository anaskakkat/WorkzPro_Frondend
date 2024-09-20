import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/User/HomePage";
import SignUpPage from "../pages/User/Signup";
import LoginPage from "../pages/User/LoginPage";
import Otp from "../pages/User/Otp";
import ProtectedRoute from "../components/protectedRoute.tsx/userProtectedRoute";
import PublicRoute from "../components/protectedRoute.tsx/PublicRoute";
import Service from "../components/User/servicesPage/Service";
import UserLayout from "../pages/User/UserLayout";
import InterceptorSetup from "../components/axiosInterceptors/axiosInterceptors";
import WorkersNearby from "../pages/User/WorkersNearby";
import DeatilsWorker from "../pages/User/DeatilsWorker";
import WorkerCheckout from "../pages/User/WorkerCheckout";
import Demo from "../components/Demo";
import BookingSuccess from "../pages/User/BookingSuccess";
import UserProfile from "../pages/User/UserProfile";
import ErrorComponent from "../components/ErrorComponent";
import Chats from "../pages/User/Chats";
import BookingsPage from "../pages/User/BookingsPage";
import DashboarLayout from "../pages/User/DashboarLayout";
import { SocketProvider } from "../context/socketContext";
import PaymentSuccess from "../components/User/Profile/PaymentSuccess";

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
          <Route path="/demo" element={<Demo />} />
          {/* homeRoute */}
          <Route path="/" element={<HomePage />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<SocketProvider />}>
              <Route path="/services" element={<Service />} />
              <Route path="/workersNearby" element={<WorkersNearby />} />
              <Route
                path="/WorkerDetails/:workerId"
                element={<DeatilsWorker />}
              />
              <Route
                path="/workerCheckout/:workerId"
                element={<WorkerCheckout />}
              />
              <Route path="/success/:id" element={<BookingSuccess />} />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route element={<DashboarLayout />}>
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/bookings" element={<BookingsPage />} />
                <Route path="/chats" element={<Chats />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<ErrorComponent />} />
        </Route>
      </Routes>
    </InterceptorSetup>
  );
};
