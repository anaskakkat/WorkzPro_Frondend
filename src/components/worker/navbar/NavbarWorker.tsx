import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/workzpro-high-resolution-logo.jpeg";
import { logoutWorker } from "../../../api/worker";
import toast from "react-hot-toast";
import { removeWorkerInfo } from "../../../redux/slices/workerSlice";
import { useDispatch, useSelector } from "react-redux";
import icon from "/vecteezy_default-avatar-profile-icon-vector-in-flat-style_27708418.jpg";
import { RootState } from "../../../redux/store/store";

const NavbarWorker: React.FC = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const worker = useSelector((state: RootState) => state.workerInfo.workerInfo);

  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await logoutWorker();

      if (response) {
        toast.success(response.data.message);
        dispatch(removeWorkerInfo());
        navigate("/worker/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-white border-custom_lightBlue border-b-2">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <Link to="/worker" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-14" alt="Workzpro Logo" />
        </Link>
        {worker && (
          <>
            <div
              className="relative flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <img className="w-8 h-8 rounded-full" src={icon} alt="user photo" />
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-4 text-center w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <ul className="" role="menu">
                    <li>
                      <Link
                        to="/worker/profile"
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-custom_lightBlue"
                        role="menuitem"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-600 hover:text-white"
                        role="menuitem"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div
              className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
              id="navbar-user"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 text-navy-900">
                <li>
                  <Link to="/worker" className="block py-2 px-3 hover:text-blue-700 md:p-0" aria-current="page">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/worker/bookings" className="block py-2 px-3 hover:text-blue-700 md:p-0">
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link to="/worker/slots" className="block py-2 px-3 hover:text-blue-700 md:p-0">
                    Slots
                  </Link>
                </li>
                <li>
                  <Link to="/worker/payments" className="block py-2 px-3 hover:text-blue-700 md:p-0">
                    Payments
                  </Link>
                </li>
                <li>
                  <Link to="/worker/reviews" className="block py-2 px-3 hover:text-blue-700 md:p-0">
                    Reviews
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavbarWorker;
