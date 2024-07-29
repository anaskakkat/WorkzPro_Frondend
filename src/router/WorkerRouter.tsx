import { Route, Routes } from "react-router-dom";
import HomePageWorker from "../pages/Worker/HomePageWorker";
import WorkerLogin from "../pages/Worker/WorkerLogin";
import SignUpPage from "../pages/Worker/SignUpPage";
import OtpWorker from "../pages/Worker/OtpWorker";
import WorkerPublicRoute from "../components/protectedRoute.tsx/worker/WorkerPublicRoute";
import WorkerProtectedRoute from "../components/protectedRoute.tsx/worker/WorkerProtectedRoute";

const WorkerRouter = () => {
  return (
    <Routes>
      <Route element={<WorkerPublicRoute />}>
        <Route path="/login" element={<WorkerLogin />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp" element={<OtpWorker />} />
      </Route>

      {/* Protected routes */}
      <Route element={<WorkerProtectedRoute />}>
        <Route path="/" element={<HomePageWorker />} />
      </Route>
    </Routes>
  );
};

export default WorkerRouter;
