import { Route, Routes } from "react-router-dom";
import { UserRouter } from "./UserRouter";
import WorkerRouter from "./WorkerRouter";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRouter />} />
      <Route path="/worker/*" element={<WorkerRouter />} />
    </Routes>
  );
};

export default AppRouter;
