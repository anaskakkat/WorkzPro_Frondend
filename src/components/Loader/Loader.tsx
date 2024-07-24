// Loader.tsx
import React from "react";
import loadingGif from "../../assets/Repairing Tools.gif";
interface LoaderProps {
  // Add any props you need here
}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <img src={loadingGif} alt="Loading..." className="w-40 h-40" />
    </div>
  );
};

export default Loader;
