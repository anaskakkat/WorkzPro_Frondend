import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

interface NavItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser className=" hidden md:w-5 md: h-5" />,
  },
  {
    name: "Bookings",
    path: "/bookings",
    icon: <FaCalendarAlt className=" hidden md:w-5 md: h-5 " />,
  },
];

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Top Navigation */}
      <nav className="md:hidden bg-blue-950 text-white p-4 fixed  top- left-0 right-0 z-10">
        <ul className="flex items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-lg  hover:text-white ${
                  location.pathname === item.path ? "bg-custom_buttonColor" : ""
                }`}
                onClick={() => setActivePage(item.name.toLowerCase())}
              >
                {item.icon}
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Sidebar */}
      <div className="hidden  md:block  left-0 h-full w-64 bg-blue-950 text-white p-5">
        <div className="flex flex-col h-full">
          <nav className="flex-grow">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-2 rounded-lg hover:bg-custom_lightBlue hover:text-black ${
                      location.pathname === item.path
                        ? "bg-custom_buttonColor"
                        : ""
                    }`}
                    onClick={() => setActivePage(item.name.toLowerCase())}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
