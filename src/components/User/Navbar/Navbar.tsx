import {  useState } from "react";
import { FaUserAlt, FaLocationArrow } from "react-icons/fa"; // Import icons from react-icons
import { MdLogout } from "react-icons/md"; // Import icons from react-icons
import logo from "../../../assets/Logo workzpro.png";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../api/user";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../../redux/slices/userSlices";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

const Navbar = () => {
  // console.log('rendered navbar');
  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
 

  // console.log("userInfo-", userInfo.userName);

  // setUserName(userInfo.userName);
  const handleSignout = async () => {
    try {
      const response = await logoutUser();
      if (response) {
        toast.success(response.data.message);
        dispatch(removeUserInfo());
        // setIsLoggedIn(false);
        // setUserName("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const getCurrentLocation = (): void => {
    setIsLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.display_name) {
              setLocation(data.display_name);
            } else {
              setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
            }
          } catch (error) {
            console.error("Error getting place name:", error);
            setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
          }
        },
        (error: GeolocationPositionError) => {
          console.error("Error getting location:", error);
          // Handle errors here, such as showing a message to the user
          setIsLoading(false);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle the case where geolocation is not supported
      setIsLoading(false);
    }
  };

  return (
    <div className="navbar px-4 sm:px-6 lg:px-20 flex flex-wrap justify-between items-center border-b-2 border-blue-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-2 sm:mb-0 justify-center w-full sm:w-auto">
        <img src={logo} alt="Logo" className="h-12 sm:h-16 lg:h-20 w-auto" />
      </div>

      {/* Location Input */}
      <div className="flex items-center border-2 border-blue-200 rounded-lg px-2 py-1 space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Enter location"
          value={isLoading ? "Loading..." : location}
          onChange={(e) => setLocation(e.target.value)}
          readOnly={isLoading}
          className="bg-transparent focus:outline-none w-full text-black"
        />
        <button
          onClick={getCurrentLocation}
          disabled={isLoading}
          className="text-gray-400 hover:text-blue-600"
        >
          <FaLocationArrow style={{ color: isLoading ? "#ccc" : "#74C0FC" }} />
        </button>
      </div>

      {/* Conditional Buttons or Profile Icon */}
      <div className="flex flex-wrap space-x-0 sm:space-x-4 w-full sm:w-auto justify-center">
        {!userInfo ? (
          <>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-xs mb-2 sm:mb-0"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-black hover:bg-custom_button_Sp text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-xs mb-2 sm:mb-0"
            >
              Professionals Login
            </button>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-700 flex items-center space-x-2 hover:text-custom_navyBlue"
            >
              <FaUserAlt style={{ fontSize: "1.5rem" }} />
                <span className="text-sm text-gray-700">{userInfo.userName}</span>
            
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-custom_lightBlue rounded-lg shadow-lg z-50">
                <button
                  onClick={() => navigate("/profile")}
                  className="block px-4 py-2 text-sm  text-gray-700 hover:bg-custom_lightBlue w-full text-left"
                >
                  Profile
                </button>
                <button
                  onClick={handleSignout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white w-full text-left"
                >
                  <MdLogout className="inline-block mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
