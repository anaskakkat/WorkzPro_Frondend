import React from "react";
import banner from "../../../assets/banner.jpg";
import { useNavigate } from "react-router-dom";

const Banner: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="relative text-center h-screen w-full flex">
      {/* Left side with text */}
      <div className="w-1/2 flex flex-col justify-center items-start p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4">
          Welcome to <span className="text-custom_buttonColor">WorkzPro</span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg mb-6 text-black max-w-lg">
          Your trusted platform for finding the best professionals to get the
          job done.
        </p>
        <button
          className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 sm:py-2 sm:px-6 lg:py-3 lg:px-8 text-base sm:text-lg rounded mx-auto "
          onClick={() => navigate("/services")}
        >
          Book Now
        </button>
      </div>

      {/* Right side with image */}
      <div className="w-full  relative">
        <img
          src={banner}
          alt="banner"
          className="absolute  right-0  h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
