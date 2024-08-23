import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Button,
  TextField,
  Typography,
  Rating,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fetchWorkers } from "../../../api/user";
import Loader from "../../loader/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import IWorker from "../../../types/IWorker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getDistance } from 'geolib';

const WorkerNearby: React.FC = () => {
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the service name from the query parameters
  const queryParams = new URLSearchParams(location.search);
  const serviceID = queryParams.get("service") || "";
  // console.log('serviceID',serviceID);
  const locationData = useSelector((state: RootState) => state.location);
  // console.log(locationData);

  useEffect(() => {
    const fetchWorkerData = async () => {
      setLoading(true);
      try {
        const response = await fetchWorkers(serviceID, locationData);
        // console.log(response);
        const fetchedWorkers = response.data;

        const workersWithDistance = fetchedWorkers.map((worker:any) => {
          const distance = getDistance(
            { latitude: locationData.coordinates[1], longitude: locationData.coordinates[0] },
            { latitude: worker.location.coordinates[1], longitude: worker.location.coordinates[0] }
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
    // console.log(worker);

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
          <Typography variant="h6" align="center">
            No users available for the selected service
          </Typography>
        ) : (
          <Grid container spacing={4}>
            {filteredWorkers.map((worker) => (
              <Grid item xs={12} sm={6} md={3} key={worker._id}>
                <div className="border-custom_lightBlue border-2 w-fit mx-auto my-5">
                  <div className="p-4">
                    <div className="flex flex-col items-center">
                      <Avatar
                        src={worker.profilePicture}
                        alt={worker.name}
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "4px",
                        }}
                        variant="square"
                      />
                      <div className="flex flex-col text-center items-center">
                        <div>{worker.name}</div>
                      </div>
                    </div>
                    <div className="justify-between mt-1 flex">
                      <div>{worker.service.name}</div>
                 
                      <Rating
                        name="read-only"
                        value={4}
                        readOnly
                        size="small"
                      />
                    </div>
                    <span className="text-sm">{worker.locationName}</span>{" "}
                    <LocationOnIcon fontSize="inherit" color="primary" />
                    <div className="flex flex-row justify-between">
                      <div className="">{worker.experience}+ yrs</div>
                      <div className="">{worker.wageDay}/day</div>
                    </div>
                    <div className="flext ">
                    <p className="text-xs text-custom_buttonColor">{worker.distance} km away</p>

                    </div>
                    <div className="flex flex-row justify-between gap-5 mt-1">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleDetails(worker._id)}
                      >
                        Details
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`/workerCheckout/${worker._id}`)
                        }
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};

export default WorkerNearby;
