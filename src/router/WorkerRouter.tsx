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
const WorkerRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<WorkerPublicRoute />}>
        <Route path="/login" element={<WorkerLogin />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpWorker />} />
      </Route>

      {/* Protected routes */}
      <Route element={<WorkerProtectedRoute />}>
        <Route path="/" element={<WorkerLayout />}>
          <Route index element={<Dashboard />} /> {/* Default route */}
          <Route path="bookings" element={<Bookings />} />
          <Route path="slots" element={<Slots />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="profile_setup" element={<ProfileSetupPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default WorkerRouter;
