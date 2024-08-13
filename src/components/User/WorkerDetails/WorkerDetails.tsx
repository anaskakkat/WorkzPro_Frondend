import { Rating } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchWorkerDatabyId } from "../../../api/user";
import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import IWorker from "../../../interface/IWorker";

const WorkerDetails = () => {
  const [worker, setWorker] = useState<IWorker | null>(null);
  const { workerId } = useParams();

  const fetchWorkerData = async () => {
    try {
      const response = await fetchWorkerDatabyId(workerId!);
      setWorker(response);
    } catch (error) {
      console.error("Failed to fetch worker data:", error);
    }
  };

  useEffect(() => {
    fetchWorkerData();
  }, [workerId]);

  if (!worker) return <Loader />;

  return (
    <div className="container p-8 my-8 flex gap-2 mx-auto border-2 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 border-2 w-fit">
        <div>
          <img
            className="mx-auto"
            width={100}
            src={worker.profilePicture}
            alt={worker.name}
          />
        </div>
        <div className="my-2 text-[14px]">
          <div className="flex justify-between text-custom_navyBlue">
            <h2 className="font-normal">{worker.name}</h2>
            <p className="text-gray-600">Exp: {worker.experience} yrs</p>
          </div>
          <p>ID: {worker._id}</p>
          <p>Location: {worker.location}</p>
          <Rating
            name="worker-rating"
            value={worker.rating || 0} // Ensure that the rating value is not null
            precision={0.1}
            readOnly
          />
        </div>
      </div>
      <div className="border-2 border-red-600 w-full">
        <div className="text-wrap text-center p-8">
          <p>
            Details about the worker's profile or projects can be added here.
          </p>
        </div>
        <div className="p-4">
          <h4>Project Images</h4>
          {worker && (
            <div className="flex gap-1">
              {worker.images?.length > 0 ? (
                worker.images.map((image, index) => (
                  <img key={index} src={image} alt={`Project ${index + 1}`} />
                ))
              ) : (
                <p>No project images available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerDetails;
