import { Route, Routes } from "react-router-dom";
import { UserRouter } from "./UserRouter";
import WorkerRouter from "./WorkerRouter";
import AdminRouter from "./AdminRouter";
import ErrorComponent from "../components/ErrorComponent";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRouter />} />
      
      <Route path="/worker/*" element={<WorkerRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="*" element={<ErrorComponent />} />
    </Routes>
  );
};

export default AppRouter;
