// WorkerRouter.tsx
import { Route, Routes } from "react-router-dom";
import WorkerLogin from "../pages/Worker/WorkerLogin";
import SignUpPage from "../pages/Worker/SignUpPage";
import OtpWorker from "../pages/Worker/OtpWorker";
import WorkerPublicRoute from "../components/protectedRoute.tsx/worker/WorkerPublicRoute";
import WorkerProtectedRoute from "../components/protectedRoute.tsx/worker/WorkerProtectedRoute";
import WorkerLayout from "../pages/Worker/WorkerLayout";
import Dashboard from "../pages/Worker/Dashboard";
import Bookings from "../pages/Worker/Bookings";
import Slots from "../pages/Worker/Slots";
import Payments from "../pages/Worker/Payments";
import Reviews from "../pages/Worker/Reviews";
import ProfileSetupPage from "../pages/Worker/ProfileSetupPage";
import ProfileVerify from "../components/protectedRoute.tsx/worker/ProfileVerify";
import WorkerInterceptor from "../components/axiosInterceptors/workerInterceptor";
import ErrorComponent from "../components/ErrorComponent";
import MapDirection from "../components/worker/bookings/MapDirection";
import WorkerProfile from "../pages/Worker/WorkerProfile";
import Chats from "../pages/Worker/Chats";
const WorkerRouter = () => {
  return (
    <WorkerInterceptor>
      <Routes>
        <Route element={<WorkerPublicRoute />}>
          <Route path="/login" element={<WorkerLogin />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/otp" element={<OtpWorker />} />
        </Route>
        <Route path="/" element={<WorkerLayout />}>
          {/* Public routes */}
          <Route element={<ProfileVerify />}>
            <Route path="profile_setup" element={<ProfileSetupPage />} />
          </Route>
          {/* Protected routes */}
          <Route element={<WorkerProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="slots" element={<Slots />} />
            <Route path="payments" element={<Payments />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="direction" element={<MapDirection />} />
            <Route path="profile" element={<WorkerProfile />} />
            <Route path="chats" element={<Chats />} />

            <Route path="*" element={<ErrorComponent />} />
          </Route>
        </Route>
      </Routes>
    </WorkerInterceptor>
  );
};

export default WorkerRouter;
