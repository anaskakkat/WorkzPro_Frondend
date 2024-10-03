// src/components/MobileMenu.tsx

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { initAutocomplete } from "@/utils/googleMapUtils";
import { setLocationState } from "@/redux/slices/LocationSlice";
import { useDispatch } from "react-redux";

interface MobileMenuProps {
  isActive: (path: string) => boolean;
  userInfo: any;
  handleCloseMenu: () => void;
  handleSignout: () => void;
  location: string; // Add location prop
  setLocation: (value: string) => void; // Add setLocation prop
  handleGetCurrentLocation: () => Promise<void>; // Add location handler prop
  isLoading: boolean; // Add loading state prop
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isActive,
  userInfo,
  handleCloseMenu,
  handleSignout,
  location,
  setLocation,
  handleGetCurrentLocation,
  isLoading,
}) => {
  const [locationCoords, setLocationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    initAutocomplete(searchInputRef, setLocationCoords, setLocation);

    // Dispatch only if locationCoords is not null
    if (locationCoords) {
      dispatch(
        setLocationState({
          type: "Point",
          coordinates: [locationCoords.lng, locationCoords.lat],
        })
      );
    }
  }, [searchInputRef, locationCoords]); // Add locationCoords to dependencies


  return (
    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
      <Link
        to="/"
        onClick={handleCloseMenu}
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          isActive("/")
            ? "text-blue-600 bg-gray-100"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        Home
      </Link>
      <Link
        to="/services"
        onClick={handleCloseMenu}
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          isActive("/services")
            ? "text-blue-600 bg-gray-100"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        Services
      </Link>
      <Link
        to="/about"
        onClick={handleCloseMenu}
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          isActive("/about")
            ? "text-blue-600 bg-gray-100"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        About Us
      </Link>
      <Link
        to="/contact"
        onClick={handleCloseMenu}
        className={`block px-3 py-2 rounded-md text-base font-medium ${
          isActive("/contact")
            ? "text-blue-600 bg-gray-100"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        }`}
      >
        Contact
      </Link>
      <div className="relative mt-3">
        <input
          type="text"
          ref={searchInputRef}
          placeholder="Enter location"
          value={isLoading ? "Loading..." : location}
          onChange={(e) => setLocation(e.target.value)}
          readOnly={isLoading}
          className="w-full bg-transparent border text-custom_navyBlue border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGetCurrentLocation}
          disabled={isLoading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600"
        >
          <FaLocationArrow />
        </button>
      </div>
      {!userInfo ? (
        <>
          <button
            onClick={() => navigate("/login")}
            className="w-full mt-3 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/worker/login")}
            className="w-full mt-3 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
          >
            Professionals Login
          </button>
        </>
      ) : (
        <div className="mt-3">
        
          <Link
            to="/profile"
            onClick={handleCloseMenu}
            className="block mt-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Profile
          </Link>
          <button
            onClick={handleSignout}
            className="w-full mt-2 text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            <MdLogout className="inline-block mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
