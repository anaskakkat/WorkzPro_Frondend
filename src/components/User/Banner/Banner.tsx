// import React from 'react';
import banner from '../../../assets/banner.jpg';

const Banner = () => {
  return (
    <div className="relative h-screen w-full ">
      <img src={banner} alt="banner" className="absolute top-0 left-0 w-full h-full object-cover" />
      <div className="relative z-10 top-28 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-2xl sm:text-2xl lg:text-6xl font-bold my-2">
          Welcome to WorksPro
        </h1>
        <p className="text-sm sm:text-lg lg:text-md md:text-md text-center max-w-2xl mb-6 text-black">
          Your trusted platform for finding the best professionals to get the job done.
        </p>
        <button className="bg-custom_buttonColor hover:bg-custom_button_Sp text-white font-bold py-2 px-4 sm:py-2 sm:px-6 md:py-2 md:px-8 lg:py-2 lg:px-10 text-base sm:text-lg lg:text-xl rounded">
  Book Now
</button>


      </div>
    </div>
  );
};

export default Banner;
