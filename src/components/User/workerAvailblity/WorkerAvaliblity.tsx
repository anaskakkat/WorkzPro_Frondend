import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { fetchWorkerDatabyId } from "../../../api/user";
import { useParams } from "react-router-dom";
import IWorker from "../../../interface/IWorker";
import Loader from "../../loader/Loader";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "0.875rem",
    padding: "8px 12px",
    height: "50px",
    "& fieldset": {
      borderColor: "#BFDBFE",
    },
    "&:hover fieldset": {
      borderColor: "#3B82F6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3B82F6",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.75rem",
    color: "#6B7280",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: "0.75rem",
    color: "#3B82F6",
  },
});

const WorkerAvailability: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const [worker, setWorker] = useState<IWorker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    selectedSlot: "",
  });

  const fetchWorker = async () => {
    if (workerId) {
      try {
        setLoading(true); // Set loading to true while fetching
        const response = await fetchWorkerDatabyId(workerId);
        setWorker(response);
      } catch (error) {
        console.error("Error fetching worker data:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      }
    }
  };

  useEffect(() => {
    fetchWorker();
  }, [workerId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingInfo);
  };

  if (loading) {
    return <Loader />; 
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-2xl md:text-2xl font-bold text-center text-custom_navyBlue mb-8">
        Worker Availability and Booking
      </h1>

      <div className="grid md:grid-cols-2 text-custom_navyBlue gap-8">
        {/* Worker Details Card */}
        <div className="mb-8 p-4 border-2 bg-custom_bg_blue border-custom_bg_blue shadow-lg rounded-lg">
          {worker ? (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <img
                src={worker.profilePicture}
                alt={worker.name}
                className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold">{worker.name}</h2>
                <p className="text-gray-700">
                  Expertise: {worker.service.name}
                </p>
                <p className="text-gray-700">
                  Experience: {worker.experience} years
                </p>
                <p className="text-gray-700">Location: {worker.location}</p>
                <div className="flex items-center justify-center sm:justify-start">
                  <p className="text-gray-700 mr-2">Rating:</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i < Math.round(worker.experience) // This is just a placeholder for rating
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>No worker information available.</p>
          )}
        </div>

        {/* Service Details Card */}
        <div className="mb-8 p-4 border-2 border-gray-200 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Service Details</h2>
          {worker ? (
            <>
              <p className="text-gray-700">Service: {worker.service.name}</p>
              <p className="text-gray-700">
                Description: {worker.service.description}
              </p>
              {/* Add other service details as needed */}
            </>
          ) : (
            <p>No service details available.</p>
          )}
        </div>
      </div>

      {/* Booking Form */}
      <div className="p-4 border-2 border-gray-200 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Book a Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledTextField
              fullWidth
              label="Name"
              name="name"
              value={bookingInfo.name}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={bookingInfo.email}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledTextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={bookingInfo.phone}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
            <StyledTextField
              fullWidth
              label="Place"
              name="place"
              // value={bookingInfo.place}
              onChange={handleInputChange}
              required
              variant="outlined"
            />
          </div>


          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker label="Basic date picker" />
      </DemoContainer>
    </LocalizationProvider>



          <StyledTextField
            fullWidth
            label="Address"
            name="address"
            value={bookingInfo.address}
            onChange={handleInputChange}
            multiline
            rows={2}
            required
            variant="outlined"
          />

          <StyledTextField
            fullWidth
            label="Comments"
            name="comments"
            // value={bookingInfo.comments}
            onChange={handleInputChange}
            multiline
            rows={2}
            variant="outlined"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="py-3 text-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
          >
            Book Appointment
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkerAvailability;
