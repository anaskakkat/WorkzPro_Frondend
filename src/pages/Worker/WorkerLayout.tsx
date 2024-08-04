import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavbarWorker from "../../components/worker/navbar/NavbarWorker";
import { useSelector } from "react-redux";
import ProfileSetupModal from "../../components/worker/ProfileSetupModal";
// import { RootState } from "../../redux/store/store";

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
  const workerInfo = useSelector((state: RootState) => state.workerInfo);
  const [showModal, setShowModal] = useState(false);
  console.log(workerInfo);

  useEffect(() => {
    if (workerInfo.isProfileSetup === false) {
      setShowModal(true);
    }
  }, [workerInfo.isProfileSetup]);
  return (
    <div>
      <NavbarWorker />
      {showModal && <ProfileSetupModal />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default WorkerLayout;
