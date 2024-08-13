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
// import Demo from "../components/Demo";

export const UserRouter = () => {
  return (
    <InterceptorSetup>
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
          {/* <Route path="/" element={<Demo />} /> */}

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/services" element={<Service />} />
            <Route path="/workersNearby" element={<WorkersNearby />} />
            <Route
              path="/WorkerDetails/:workerId"
              element={<DeatilsWorker />}
            />
          </Route>
        </Route>
      </Routes>
    </InterceptorSetup>
  );
};
