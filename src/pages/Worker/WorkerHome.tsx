import React, { useState, useEffect, ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Person from "@mui/icons-material/Person";
import { Chat } from "@mui/icons-material";

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
      <nav className="sticky top-0 z-50 w-full bg-gray-50 border-b border-gray-200">
        <div className=" mx-10 px-3 py-3 lg:px-5 lg:pl-3 flex items-center justify-between">
          {/* Toggle button for mobile screens */}
          <button
            className="inline-flex items-center p-3 text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </button>

          {/* Logo */}
          <img src={logo} alt="Logo" className="h-12" />

          <div className="flex items-center">
            <span className="text-custom_navyBlue font-medium mr-4 capitalize">
              {worker && worker.name}
            </span>
            <Avatar alt="John Doe" src={worker?.profilePicture} />
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static top-0 left-0 w-64 h-full transition-transform duration-300 ease-in-out border-r border-gray-100 bg-gray-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 flex flex-col z-40`}
          aria-label="Sidebar"
        >
          <div className="flex flex-col h-full py-3 px-2 bg-custom-gradient-black rounded-lg m-3">
            <ul className="space-y-2 font-medium text-blue-50">
              {/* Dashboard Tab */}
              <Link to="/worker">
                <li
                  className={`flex items-center p-3 rounded-lg m-2 hover:bg-custom-gradient-blue ${
                    location.pathname === "/worker"
                      ? "bg-custom-gradient-blue text-white"
                      : "bg-custom-gradient-black"
                  }`}
                >
                  <DashboardIcon />
                  <span className="ml-3">Dashboard</span>
                </li>
              </Link>

              {/* Slot Tab */}
              <Link to="/worker/slots">
                <li
                  className={`flex items-center p-3 rounded-lg m-2 hover:bg-custom-gradient-blue ${
                    location.pathname === "/worker/slots"
                      ? "bg-custom-gradient-blue text-white"
                      : "bg-custom-gradient-black"
                  }`}
                >
                  <SlotIcon />
                  <span className="ml-3">Slot</span>
                </li>
              </Link>

              {/* Bookings Tab */}
              <Link to="/worker/bookings">
                <li
                  className={`flex items-center p-3 rounded-lg m-2 hover:bg-custom-gradient-blue ${
                    location.pathname === "/worker/bookings"
                      ? "bg-custom-gradient-blue text-white"
                      : "bg-custom-gradient-black"
                  }`}
                >
                  <CalendarMonthIcon />
                  <span className="ml-3">Bookings</span>
                </li>
              </Link>

              {/* Profile Tab */}
              <Link to="/worker/profile">
                <li
                  className={`flex items-center p-3 rounded-lg m-2 hover:bg-custom-gradient-blue ${
                    location.pathname === "/worker/profile"
                      ? "bg-custom-gradient-blue text-white"
                      : "bg-custom-gradient-black"
                  }`}
                >
                  <Person />
                  <span className="ml-3">Profile</span>
                </li>
              </Link>

              {/* Chats Tab */}
              <Link to="/worker/chats">
                <li
                  className={`flex items-center p-3 rounded-lg m-2 hover:bg-custom-gradient-blue ${
                    location.pathname === "/worker/chats"
                      ? "bg-custom-gradient-blue text-white"
                      : "bg-custom-gradient-black"
                  }`}
                >
                  <Chat />
                  <span className="ml-3">Chats</span>
                </li>
              </Link>
            </ul>

            {/* Logout Button */}
            <div className="mt-auto py-4 px-2">
              <button
                onClick={handleLogout}
                className="flex items-center w-full h-8 bg-custom-gradient-red hover:bg-red-800 px-4 rounded"
              >
                <ExitToAppIcon className="mr-2" />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default WorkerHome;
