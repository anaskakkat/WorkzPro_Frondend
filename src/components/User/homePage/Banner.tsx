import React from "react";
import banner from "../../../assets/banner.jpg";
import { useNavigate } from "react-router-dom";

const Banner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full flex flex-col lg:flex-row lg:h-[calc(100vh-4rem)] text-center lg:text-left">
      {/* Right side with image (now full-screen on large screens) */}
      <div className="flex-1 relative">
        <img
          src={banner}
          alt="banner"
          className="w-full h-auto lg:h-full object-cover"
        />
        {/* Centered text and button overlay for large screens */}
        <div className="hidden lg:flex flex-col justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-8 w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold mb-4 font-oswald text-[#23265A]"> {/* Navy blue color */}
            Welcome to <span className="text-[#3182CE]">WorkzPro</span> {/* Blue color to match */}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg mb-6 text-[#23265A] max-w-lg text-center"> {/* Navy blue */}
            Your trusted platform for finding the best professionals to get the job done.
          </p>
          <button
            className="bg-custom-gradient-red hover:bg-custom-gradient-black text-white font-bold py-2 px-4 sm:py-2 sm:px-6 lg:py-3 lg:px-8 text-base sm:text-lg rounded"
            onClick={() => navigate("/services")}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Text and button below image for smaller screens */}
      <div className="flex-1 flex flex-col justify-center items-center lg:hidden p-8">
        <h1 className="text-2xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold mb-4 font-oswald text-[#23265A]"> {/* Navy blue */}
          Welcome to <span className="text-[#3182CE]">WorkzPro</span> {/* Blue color to match */}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg mb-6 text-[#3182CE] max-w-lg">
          Your trusted platform for finding the best professionals to get the job done.
        </p>
        <button
          className="bg-custom-gradient-red hover:bg-custom-gradient-black text-white font-bold py-2 px-4 sm:py-2 sm:px-6 lg:py-3 lg:px-8 text-base sm:text-lg rounded"
          onClick={() => navigate("/services")}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
