import React from "react";
import { Outlet } from "react-router-dom";
import NavbarWorker from "../../components/worker/navbar/NavbarWorker";

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
