// import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../assets/Logo workzpro.png";

const Navbar = () => {
  return (
    <div className="navbar text-white px-4 sm:px-6 lg:px-20 flex flex-wrap justify-between items-center border-b-2 border-blue-200 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-2 mb-2 sm:mb-0 justify-center w-full sm:w-auto">
        <img src={logo} alt="Logo" className="h-12 sm:h-16 lg:h-20 w-auto" />
      </div>

      {/* Location Input */}
      <div className="flex items-center border-2 border-blue-200 rounded-lg px-2 py-1 space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Enter location"
          className="bg-transparent focus:outline-none w-full text-black"
        />
        <button className="text-gray-400 hover:text-blue-600">
          <FontAwesomeIcon
            icon={faLocationCrosshairs}
            style={{ color: "#74C0FC" }}
          />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap space-x-0 sm:space-x-4 w-full sm:w-auto justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-xs mb-2 sm:mb-0">
          Login
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto text-xs mb-2 sm:mb-0">
          Professionals Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
