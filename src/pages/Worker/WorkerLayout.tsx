import React from "react";
import { Outlet } from "react-router-dom";
import NavbarWorker from "../../components/worker/navbar/NavbarWorker";

export interface WorkerInfo {
  name: string;
  isProfileSetup: boolean;
  email: string;
  role: string;
  phoneNumber: string;
  status: string;
}

export interface RootState {
  workerInfo: WorkerInfo;
}
const WorkerLayout: React.FC = () => {
  return (
    <div>
      <NavbarWorker />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default WorkerLayout;
