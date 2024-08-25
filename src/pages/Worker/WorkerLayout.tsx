import React from "react";
import { Outlet } from "react-router-dom";
import WorkerHome from "./WorkerHome";

const WorkerLayout: React.FC = () => {
  return (
    <WorkerHome> 
      <Outlet /> 
    </WorkerHome>
  );
};

export default WorkerLayout;
