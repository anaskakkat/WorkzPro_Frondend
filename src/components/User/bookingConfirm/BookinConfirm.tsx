import React from 'react';
import { Typography, Paper, Button, Box, Divider, Icon } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const BookingConfirm = () => {
  const navigate = useNavigate();

  // Mock booking details (replace with actual data from your application)
  const bookingDetails = {
    workerName: "John Doe",
    service: "Plumbing",
    date: "August 20, 2024",
    time: "2:00 PM - 4:00 PM",
    bookingId: "BK12345"
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 500, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Booking Confirmed!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Your booking has been successfully placed.
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Booking Details
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonIcon sx={{ mr: 1 }} />
            <Typography>
              <strong>Worker:</strong> {bookingDetails.workerName} ({bookingDetails.service})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CalendarTodayIcon sx={{ mr: 1 }} />
            <Typography>
              <strong>Date:</strong> {bookingDetails.date}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ mr: 1 }} />
            <Typography>
              <strong>Time:</strong> {bookingDetails.time}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Booking ID: {bookingDetails.bookingId}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
          <Button variant="outlined" color="primary" onClick={() => navigate('/bookings')}>
            View All Bookings
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingConfirm;