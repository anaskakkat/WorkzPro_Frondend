import React, { useState, useEffect, ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SlotIcon from "@mui/icons-material/AccessTime";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import logo from "/workzpro-high-resolution-logo.jpeg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { logoutWorker } from "../../api/worker";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeWorkerInfo } from "../../redux/slices/workerSlice";

interface WorkerHomeProps {
  children: ReactNode;
}

const WorkerHome: React.FC<WorkerHomeProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const location = useLocation();
  const worker = useSelector((state: RootState) => state.workerInfo.workerInfo);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    const response = await logoutWorker();
    console.log(response);
    if (response && response.status === 200) {
      toast.success(response.data.message);
      dispatch(removeWorkerInfo());
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
        <div className=" mx-10 px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          <button
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </button>

          <img src={logo} alt="Logo" className="h-12" />

          <div className="flex items-center">
            <span className="text-custom_navyBlue mr-4 capitalize">
              {worker && worker.name}
            </span>
            <Avatar alt="John Doe" src={worker && worker.profilePicture} />
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`fixed lg:static top-0 left-0 w-60 h-full transition-transform border-r border-gray-200 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 flex flex-col`}
          aria-label="Sidebar"
        >
          <div className="flex-1 py-8 px-2 pb-4 overflow-y-auto  bg-blue-50">
            <ul className="space-y-2 font-medium ">
              {/* Dashboard Tab */}
              <Link to="/worker">
                <li
                  className={`flex items-center p-2 cursor-pointer rounded-lg m-2 hover:bg-gray-300 hover:text-blue-900 ${
                    location.pathname === "/worker"
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <DashboardIcon
                    className={`text-gray-500 transition duration-75 hover:text-blue-900 ${
                      location.pathname === "/worker" ? "text-white " : ""
                    }`}
                  />
                  <span className="ml-3">Dashboard</span>
                </li>
              </Link>

              {/* Slot Tab */}
              <Link to="/worker/slots">
                <li
                  className={`flex items-center p-2 cursor-pointer rounded-lg m-2 hover:bg-gray-300 hover:text-blue-900 ${
                    location.pathname === "/worker/slots"
                      ? "bg-blue-600 text-white"
                      : ""
                  }`}
                >
                  <SlotIcon
                    className={`text-gray-500 transition duration-75 ${
                      location.pathname === "/worker/slots" ? "text-white " : ""
                    }`}
                  />
                  <span className="ml-3">Slot</span>
                </li>
              </Link>
            </ul>
          </div>
          <div className="flex items-center justify-center py-4 px-3 bg-blue-100">
            <button
              onClick={handleLogout}
              className="flex items-center w-full text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
            >
              <ExitToAppIcon className="mr-2" />{" "}
              {/* Add margin-right for spacing */}
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default WorkerHome;
