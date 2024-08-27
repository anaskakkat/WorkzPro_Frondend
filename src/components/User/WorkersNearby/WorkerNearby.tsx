import React, { useEffect, useState } from "react";
import { Avatar, Button, TextField, Typography, Rating } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fetchWorkers } from "../../../api/user";
import Loader from "../../loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import IWorker from "../../../types/IWorker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getDistance } from "geolib";

const WorkerNearby: React.FC = () => {
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the service name from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const serviceID = queryParams.get("service") || "";
  const locationData = useSelector((state: RootState) => state.location);

  useEffect(() => {
    const fetchWorkerData = async () => {
      setLoading(true);
      try {
        const response = await fetchWorkers(serviceID, locationData);
        const fetchedWorkers = response.data;

        const workersWithDistance = fetchedWorkers.map((worker: any) => {
          const distance = getDistance(
            {
              latitude: locationData.coordinates[1],
              longitude: locationData.coordinates[0],
            },
            {
              latitude: worker.location.coordinates[1],
              longitude: worker.location.coordinates[0],
            }
          );

          return {
            ...worker,
            distance: (distance / 1000).toFixed(2), // Convert meters to kilometers and round off
          };
        });
        setWorkers(workersWithDistance);
      } catch (error) {
        console.error("Failed to fetch workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, [serviceID]);

  const handleDetails = (workerId: string) => {
    navigate(`/WorkerDetails/${workerId}`);
  };

  const filteredWorkers = workers.filter((worker) => {
    return worker.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-custom_bg_blue p-4 md:h-screen">
        <TextField
          fullWidth
          label="Search workers"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          margin="normal"
        />
      </div>

      {/* Worker Cards */}

      <div className="flex-1 p-4">
        {filteredWorkers.length === 0 ? (
          <div className="flex min-h-full mx-auto align-middle  justify-center">
            No users available for the selected service
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 capitalize">
            {filteredWorkers.map((worker) => (
              <div
                key={worker._id}
                className="border-blue-200 border w-full py-2 px-3 flex flex-col items-center rounded-xl"
              >
                <div className="rounded-lg">
                  <img
                    src={worker.profilePicture}
                    width={180}
                    alt="profile"
                    className="rounded-xl  shadow-md shadow-slate-200"
                  />
                </div>
                <div className="flex flex-col text-center ">
                  <div className="text-xl font-bold text-custom_navyBlue mt-4">
                    {worker.name}
                  </div>
                  <div className="font-semibold text-gray-600">
                    {worker.service.name}
                  </div>

                  <p className="text-sm font-medium text-blue-950 mb-2">
                    {worker.distance} km away
                  </p>
                  <button
                    className=" border border-blue-500 px-11  font-semibold py-2 rounded-full w-full bg-blue-700 text-white hover:bg-blue-800"
                    onClick={() => handleDetails(worker._id)}
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerNearby;
