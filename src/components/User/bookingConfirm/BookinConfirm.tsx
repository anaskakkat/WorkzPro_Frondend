import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Button,
  Box,
  Divider,
  Avatar,
  useMediaQuery,
  Theme,
  Grid,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Booking } from "../../../types/Booking";
import { fetchBookings } from "../../../api/user";
import Loader from "../../loader/Loader";

const BookingConfirm: React.FC = () => {
  const [booking, setBooking] = useState<Booking>();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const isAboveMd = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const location = useLocation();
  const { bookingId } = useParams();

  useEffect(() => {
    console.log("successpage----");

    if (!location.state || (!location.state.bookingSuccess && !bookingId)) {
      navigate("/");
    }
  }, [location, navigate]);
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetchBookings(id!);

      if (response.status === 200) {
        // console.log("resp---", response.data);
        setBooking(response.data.booking);
      }
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  const BookingDetail: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string;
  }> = ({ icon, label, value }) => (
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Avatar sx={{ bgcolor: "primary.light", mr: 2, width: 40, height: 40 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body1" fontWeight="medium">
          {value}
        </Typography>
      </Box>
    </Box>
  );
  console.log("bokking----", booking);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f4f8",
        padding: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          maxWidth: isAboveMd ? 800 : 500,
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <Grid container spacing={4}>
          {isAboveMd && (
            <Grid item md={4}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "primary.light",
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Avatar
                  src={
                    booking?.workerId.profilePicture || "/default-avatar.png"
                  }
                  alt={booking?.workerId.name || "Worker"}
                  sx={{ width: 150, height: 150, mb: 2 }}
                />
                <Typography variant="h6" align="center" color={'white'}>
                  {booking?.workerId.name || "Worker Name"}
                </Typography>
              </Box>
            </Grid>
          )}
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "success.main",
                  mb: 2,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography
                variant="h5"
                gutterBottom
                fontWeight="bold"
                color="primary.main"
                align="center"
              >
                Service Booked!
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                align="center"
              >
                Your service request has been successfully placed and is
                awaiting worker confirmation.
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="bold"
                color="primary.main"
              >
                Booking Details
              </Typography>
              {booking ? (
                <>
                  <BookingDetail
                    icon={<PersonIcon />}
                    label="Worker"
                    value={booking.workerId.name}
                  />
                  <BookingDetail
                    icon={<CalendarTodayIcon />}
                    label="Date"
                    value={new Date(booking.bookingDate).toLocaleDateString()}
                  />
                  <BookingDetail
                    icon={<AccessTimeIcon />}
                    label="Time"
                    value={booking.slots}
                  />
                  <BookingDetail
                    icon={<LocationOnIcon />}
                    label="Location"
                    value={booking.workerId.locationName || "Not specified"}
                  />
                </>
              ) : (
                <Typography>
                  <Loader />
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/")}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  flex: { xs: "1 0 100%", sm: "0 1 auto" },
                }}
              >
                Home Page
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate("/bookings")}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  px: 3,
                  py: 1,
                  flex: { xs: "1 0 100%", sm: "0 1 auto" },
                }}
              >
                View All Bookings
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default BookingConfirm;
