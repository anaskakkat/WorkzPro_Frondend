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
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { fetchWorkers } from "../../../api/user"; // Adjust this import path as needed
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";

interface Service {
  _id: string;
  name: string;
  description: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Worker {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  wallet: number;
  isBlocked: boolean;
  isProfileSetup: boolean;
  status: string;
  experience: number;
  identityProof: string;
  location: string;
  profilePicture: string;
  service: Service;
  loginAccess: boolean;
}

const WorkerNearby: React.FC = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchWorkerData = async () => {
      setLoading(true);
      try {
        const response: Worker[] = await fetchWorkers();
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
  const handleDetails = (workerId:string) => {
    navigate(`/WorkerDetails/${workerId}`);
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container flex mx-auto  my-8">
      <Grid container spacing={10}>
        {workers.map((worker) => (
          <Grid item xs={12} sm={6} md={4} key={worker._id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                transition: "0.3s",
                "&:hover": {
                  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                },
              }}
            >
              <CardContent
                sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={worker.profilePicture}
                      alt={worker.name}
                      sx={{
                        width: 60,
                        height: 60,
                        mr: 2,
                        borderRadius: "4px",
                      }}
                      variant="square"
                    />
                    <Box>
                      <Typography variant="h6" component="div">
                        {worker.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {worker.service.name}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                      >
                        <LocationOnIcon fontSize="small" color="action" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 0.5 }}
                        >
                          {worker.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                    }}
                  >
                    <Rating name="read-only" value={4} readOnly size="small" />
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" color="primary" fontWeight="bold">
                    {worker.experience}+ yrs
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    1000/Day
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: "auto",
                  }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleDetails(worker._id)}
                  >
                    Details
                  </Button>
                  <Button variant="contained" size="small">
                    Book
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WorkerNearby;
