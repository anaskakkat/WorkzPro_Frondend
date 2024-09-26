import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineUser, AiOutlineBook, AiOutlineMessage } from "react-icons/ai";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-50 ">
      {/* Sidebar */}
      <div className="bg-custom-gradient-dark_blue text-white w-auto md:w-1/4 lg:w-1/5 py-2 sm:py-8 px-4 rounded-lg my-3 mx-3">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 py-2  font-semibold bg-custom-gradient-blue rounded-md"
                  : "flex items-center px-4 py-2  font-semibold bg-custom-gradient-dark_blue hover:bg-custom-gradient-blue rounded-md"
              }
            >
              <AiOutlineUser className="mr-3 text-2xl" />
              <span>Profile</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bookings"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 py-2  font-semibold bg-custom-gradient-blue rounded-md"
                  : "flex items-center px-4 py-2  font-semibold  bg-custom-gradient-dark_blue hover:bg-custom-gradient-blue rounded-md"
              }
            >
              <AiOutlineBook className="mr-3 text-2xl" />
              <span>Bookings</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chats"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 py-2  font-semibold bg-custom-gradient-blue rounded-md"
                  : "flex items-center px-4 py-2  font-semibold  bg-custom-gradient-dark_blue hover:bg-custom-gradient-blue rounded-md"
              }
            >
              <AiOutlineMessage className="mr-3 text-2xl" />
              <span>Chats</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full bg-gray-100 h-full ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
