// import React from 'react';
import midbanner from "../../../assets/midBanner.jpg";

const MidBanner = () => {
  return (
    <div className="flex w-full h-40">
      <div className="w-3/5 flex justify-center items-center overflow-hidden">
        <img src={midbanner} alt="midbanner" className="w-full h-full object-cover" />
      </div>
      <div className="w-2/5 flex justify-center items-center">
        <h4 className="text-center text-navyBlue">"Find the Right Handyman for Every Job, Every Time."</h4>
      </div>
    </div>
  );
};

export default MidBanner;
