// src/components/MobileMenu.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

interface MobileMenuProps {
  isActive: (path: string) => boolean;
  userInfo: any;
  handleCloseMenu: () => void;
  handleSignout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isActive,
  userInfo,
  handleCloseMenu,
  handleSignout,
}) => {
  const navigate = useNavigate();

  return (
    <div className="inset-0 w-full bg-white z-0">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link
          to="/"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/")
              ? "text-blue-600 bg-gray-100"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
          onClick={handleCloseMenu}
        >
          Home
        </Link>
        <Link
          to="/services"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/services")
              ? "text-blue-600 bg-gray-100"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
          onClick={handleCloseMenu}
        >
          Services
        </Link>
        <Link
          to="/contact"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/contact")
              ? "text-blue-600 bg-gray-100"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
          onClick={handleCloseMenu}
        >
          Contact
        </Link>
        <Link
          to="/about"
          className={`block px-3 py-2 rounded-md text-base font-medium ${
            isActive("/about")
              ? "text-blue-600 bg-gray-100"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          }`}
          onClick={handleCloseMenu}
        >
          About
        </Link>
        {!userInfo ? (
          <>
            <button
              onClick={() => {
                handleCloseMenu();
                navigate("/login");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 px-4 rounded"
            >
              Login
            </button>
            <button
              onClick={() => {
                handleCloseMenu();
                navigate("/worker/login");
              }}
              className="bg-black hover:bg-gray-800 text-white w-full py-2 px-4 rounded"
            >
              Professionals Login
            </button>
          </>
        ) : (
          <div className="space-y-1">
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-200"
              onClick={handleCloseMenu}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                handleSignout();
                handleCloseMenu();
              }}
              className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white flex items-center"
            >
              <MdLogout className="inline-block mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
