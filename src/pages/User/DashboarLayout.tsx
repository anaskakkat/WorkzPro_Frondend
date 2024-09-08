import { NavLink, Outlet } from "react-router-dom";
import { AiOutlineUser, AiOutlineBook, AiOutlineMessage } from "react-icons/ai";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col md:flex-row ">
      {/* Sidebar */}
      <div className="bg-gray-800 text-white w-auto md:w-1/4 lg:w-1/5 p-4">
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 py-2  font-semibold bg-blue-600 rounded-md"
                  : "flex items-center px-4 py-2  font-semibold hover:bg-blue-600 rounded-md"
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
                  ? "flex items-center px-4 py-2  font-semibold bg-blue-600 rounded-md"
                  : "flex items-center px-4 py-2  font-semibold hover:bg-blue-600 rounded-md"
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
                  ? "flex items-center px-4 py-2  font-semibold bg-blue-600 rounded-md"
                  : "flex items-center px-4 py-2  font-semibold hover:bg-blue-600 rounded-md"
              }
            >
              <AiOutlineMessage className="mr-3 text-2xl" />
              <span>Chats</span>
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-full  md:w-3/4 lg:w-4/5 bg-gray-100 ">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
