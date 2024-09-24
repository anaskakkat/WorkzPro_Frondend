import React from "react";
import { Rating } from "@mui/material";
import IWorker from "../../../types/IWorker";

interface WorkerCardProps {
  worker: IWorker;
  onDetailsClick: (workerId: string) => void;
}

const WorkerCard: React.FC<WorkerCardProps> = ({ worker, onDetailsClick }) => {
  return (
    <div className="border border-blue-200 w-full py-2 px-3 flex flex-col items-center rounded-xl">
      <div className="rounded-lg">
        <img
          src={worker.profilePicture}
          width={160}
          alt="profile"
          className="rounded-xl shadow-md shadow-slate-200"
        />
      </div>
      <div className="flex flex-col text-center">
        <div className="text-xl font-bold text-custom_navyBlue mt-4">
          {worker.name}
        </div>
        <div className="font-semibold text-gray-600">
          {worker.service.name}
        </div>
        <p>
          <Rating value={worker.averageRating} />
        </p>
        <p className="text-xs font-medium text-blue-700 mb-2">
          {worker.distance} km away
        </p>
        <button
          className="border border-blue-500 px-11 font-semibold py-2 rounded-full w-full bg-custom-gradient-blue text-white hover:bg-blue-800"
          onClick={() => onDetailsClick(worker._id)}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default WorkerCard;
