
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserAlt, FaLocationArrow, FaBars, FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../../redux/slices/userSlices";
import { logoutUser } from "../../../api/user";
import toast from "react-hot-toast";
import logo from "/workzpro-high-resolution-logo.jpeg";
import { getSystemPosition } from "../../../utils/getCurrentLoaction";
import { fetchLocationDetails } from "../../../utils/getLocationDetails";
import { setLocationState } from "../../../redux/slices/LocationSlice";
import { useUserDeatils } from "@/redux/hooks/userSelectors";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLocation = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userInfo = useUserDeatils();

  useEffect(() => {
    handleGetCurrentLocation();
  }, []);

  const isActive = (path: string): boolean => {
    return currentLocation.pathname === path;
  };

  const handleSignout = async (): Promise<void> => {
    try {
      const response = await logoutUser();
      if (response) {
        toast.success(response.data.message);
        dispatch(removeUserInfo());
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  const toggleDropdown = (): void => setIsDropdownOpen(!isDropdownOpen);
  const toggleMenu = (): void => setIsMenuOpen(!isMenuOpen);

  const handleGetCurrentLocation = async () => {
    try {
      const position = await getSystemPosition();
      const { latitude, longitude } = position.coords;
      const locationData = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      const locality = await fetchLocationDetails(latitude, longitude);
      dispatch(setLocationState(locationData));
      setLocation(locality);
    } catch (error: any) {
      if (error.code === error.PERMISSION_DENIED) {
        toast.error("Location access denied. Please enable location services.");
      } else {
        toast.error("Failed to fetch location. Please try again.");
      }
      setLocation("Unknown location");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to close menu after clicking a link
  const handleCloseMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 h-16 bg-white shadow-md z-50 px-4 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center max-h-16 ">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <img className="h-14 w-auto" src={logo} alt="Logo" />
            </Link>
          </div>
          <div className="hidden md:flex font-medium mi flex-1 justify-center items-center space-x-4">
            <Link
              to="/"
              className={`${
                isActive("/") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Home
            </Link>
            <Link
              to="/services"
              className={`${
                isActive("/services") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Services
            </Link>
            <Link
              to="/contact"
              className={`${
                isActive("/contact") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Contact
            </Link>
            <Link
              to="/about"
              className={`${
                isActive("/about") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              About
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative flex items-center justify-center cursor-pointer">
              <FaLocationArrow
                className="text-blue-600 w-5 h-4 mr-2"
                onClick={handleGetCurrentLocation}
              />
              <span className="text-sm text-gray-700">{location}</span>
            </div>
            <div className="relative">
              {userInfo ? (
                <div ref={dropdownRef} className="relative inline-block">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center text-gray-700 focus:outline-none"
                  >
                    <FaUserAlt className="w-5 h-5 text-blue-600" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-white border rounded-lg shadow-md z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={toggleDropdown}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleSignout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-blue-600 text-white py-1 px-3 rounded"
                >
                  Login
                </button>
              )}
            </div>
          </div>
          {/* Mobile menu toggle button */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && (
        <MobileMenu
          isActive={isActive}
          userInfo={userInfo}
          handleCloseMenu={handleCloseMenu}
          handleSignout={handleSignout}
        />
      )}
    </nav>
  );
};

export default Navbar;
