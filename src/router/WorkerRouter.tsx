import { Route, Routes } from "react-router-dom";
import HomePageWorker from "../pages/Worker/HomePageWorker";
import WorkerLogin from "../pages/Worker/WorkerLogin";
import SignUpPage from "../pages/Worker/SignUpPage";
import OtpWorker from "../pages/Worker/OtpWorker";

const WorkerRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePageWorker />} />
      <Route path="/login" element={<WorkerLogin />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/otp" element={<OtpWorker />} />
    </Routes>
  );
};

export default WorkerRouter;
