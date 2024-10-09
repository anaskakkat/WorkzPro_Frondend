import React, { useState } from "react";
import banner from "../../../assets/new banner.jpg";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner: React.FC = () => {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false); 

  // Animation settings for image
  const imageAnimation = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: "0%", opacity: 1, transition: { duration: 1.5 } },
  };

 // Animation settings for text (slide down effect)
const textAnimation = {
  initial: { opacity: 0, y: -50 },
  animate: {
    opacity: 1,
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" }, 
  },
};


  return (
    <div className="relative w-full flex flex-col lg:flex-row lg:h-[calc(100vh-3rem)] text-left">
      {/* Right side with image (now full-screen on all screens) */}
      <motion.div
        className="flex-1 relative"
        initial="initial"
        animate="animate"
        variants={imageAnimation}
        onAnimationComplete={() => setShowText(true)}
      >
        <img
          src={banner}
          alt="banner"
          className="w-full h-[calc(100vh-3rem)] object-cover"
        />
      </motion.div>

      {/* Centered text and button overlay for all screens */}
      {showText && (
        <motion.div
          className="flex flex-col absolute bottom-0 left-0 w-full p-5 sm:p-8 items-start lg:items-start gap-2"
          initial="initial"
          animate="animate"
          variants={textAnimation}
        >
          <h1 className="text-2xl w-36 sm:w-auto sm:text-4xl lg:text-5xl xl:text-7xl font-bold sm:mb-4 font-oswald   bg-custom-gradient-white bg-clip-text text-transparent">
            Welcome to{" "}
            <span className="bg-custom-gradient-blue bg-clip-text text-transparent border- ">
              WorkzPro
            </span>
          </h1>
          <p className="text-sm sm:text-lg lg:text-lg sm:mb-6 text-gray-400 max-w-[12rem]  sm:max-w-lg">
            Your trusted platform for finding the best professionals to get the
            job done.
          </p>
          <button
            className="bg-custom-gradient-blue hover:bg-custom-gradient-black text-white text-base font-bold py-2 px-4 sm:py-3 sm:px-6 lg:py-3 lg:px-8 rounded"
            onClick={() => navigate("/services")}
          >
            Book Now
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Banner;
