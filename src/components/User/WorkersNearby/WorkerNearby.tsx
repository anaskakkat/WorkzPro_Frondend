import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Box,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fetchWorkers } from "../../../api/user"; // Adjust this import path as needed
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";
import IWorker from "../../../interface/IWorker";

const WorkerNearby: React.FC = () => {
  const [workers, setWorkers] = useState<IWorker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterService, setFilterService] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkerData = async () => {
      setLoading(true);
      try {
        const response: IWorker[] = await fetchWorkers();
        const filteredWorkers = response.filter((worker) => !worker.isBlocked);
        setWorkers(filteredWorkers);
      } catch (error) {
        console.error("Failed to fetch workers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerData();
  }, []);

  const handleDetails = (workerId: string) => {
    navigate(`/WorkerDetails/${workerId}`);
  };

  const filteredWorkers = workers.filter(
    (worker) =>
      worker.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterService === "" || worker.service.name === filterService)
  );

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
        <FormControl fullWidth margin="normal">
          <InputLabel>Filter by Service</InputLabel>
          <Select
            value={filterService}
            label="Filter by Service"
            onChange={(e) => setFilterService(e.target.value as string)}
          >
            <MenuItem value="">All Services</MenuItem>
            {/* Add menu items based on your available services */}
            <MenuItem value="Plumbing">Plumbing</MenuItem>
            <MenuItem value="Electrician">Electrician</MenuItem>
            {/* Add more services as needed */}
          </Select>
        </FormControl>
      </div>

      {/* Worker Cards  */}
      <div className="container flex-1  ">
        <Grid container spacing={4}>
          {filteredWorkers.map((worker) => (
            <Grid item xs={12} sm={6} md={3} key={worker._id}>
              <div className="border-custom_Border border-2 w-fit mx-auto my-5 ">
                <div className="p-4">
                  <div className="flex flex-col items-center ">
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
                      <Rating
                        name="read-only"
                        value={4}
                        readOnly
                        size="small"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row justify-between mt-1">
                    <div>{worker.service.name}</div>
                    <div className="flex flex-row">
                      <LocationOnIcon fontSize="inherit" color="primary" />
                      <div>{worker.location}</div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-between">
                    <div className="">{worker.experience}+ yrs</div>
                    <div className="">{worker.wageDay}/day</div>
                  </div>

                  <div className="flex flex-row justify-between gap-5 mt-1 ">
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
                      onClick={() => navigate(`/workerCheckout/${worker._id}`)}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default WorkerNearby;
