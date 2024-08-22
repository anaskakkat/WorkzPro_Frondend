import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserAlt, FaLocationArrow, FaBars, FaTimes } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { removeUserInfo } from "../../../redux/slices/userSlices";
import { logoutUser } from "../../../api/user";
import toast from "react-hot-toast";
import logo from "/workzpro-high-resolution-logo.jpeg";
import { getCurrentPosition } from "../../../utils/getCurrentLoaction";
import { fetchLocationDetails } from "../../../utils/getLocationDetails";
// import { initAutocomplete } from "../../../utils/googleMapUtils";
import { IUser } from "../../../types/user";
import { setLocationState } from "../../../redux/slices/LocationSlice";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLocation = useLocation();
  const searchInput = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userInfo = useSelector<RootState, IUser | null>(
    (state) => state.userInfo.userInfo
  );
  // console.log(userInfo);

  // useEffect(() => {
  //   initAutocomplete(searchInput);
  // }, [searchInput]);

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
      setIsLoading(true);
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      const locationData = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      const locality = await fetchLocationDetails(latitude, longitude);
      // console.log("locality:-----", locality);
      dispatch(setLocationState(locationData));
      setLocation(locality);
    } catch (error: any) { 
      console.error("Error:", error);
      toast.error(error.message || "Failed to fetch location details.");
      setLocation("Unknown location");
    } finally {
      setIsLoading(false);
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

  return (
    <nav className="sticky top-0 h-16 bg-white shadow-md z-50 px-4 flex-shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center max-h-16 ">
          <div className="flex-shrink-0  flex items-center">
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
            {/* <Link
              to="/workersNearby"
              className={`${
                isActive("/workersNearby") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Workers
            </Link> */}
            <Link
              to="/"
              className={`${
                isActive("") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              Contact
            </Link>
            <Link
              to=""
              className={`${
                isActive("/") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600`}
            >
              About
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                ref={searchInput}
                placeholder="Enter location"
                value={isLoading ? "Loading..." : location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
                readOnly={isLoading}
                className="bg-transparent  text-custom_navyBlue border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300"
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
                  className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/worker/login")}
                  className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                >
                  Professionals Login
                </button>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
                >
                  <FaUserAlt />
                  <span className="text-custom_navyBlue capitalize">
                    {userInfo.name}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div className="fixed top-12 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-200"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleSignout}
                      className=" w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500  hover:text-white flex items-center"
                    >
                      <MdLogout className="inline-block mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className=" inset-0 bg-white z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
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
                ref={searchInput}
                placeholder="Enter location"
                value={isLoading ? "Loading..." : location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value)
                }
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
                <div className="flex items-center space-x-2 hover:bg-custom_lightBlue">
                  <FaUserAlt />
                  <span>{userInfo.userName}</span>
                </div>
                <Link
                  to="/profile"
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
