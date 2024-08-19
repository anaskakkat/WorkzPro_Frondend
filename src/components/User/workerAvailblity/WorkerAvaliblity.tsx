import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  fetchSlotById,
  fetchWorkerDatabyId,
  submitBooking,
} from "../../../api/user";
import { useNavigate, useParams } from "react-router-dom";
import IWorker from "../../../interface/IWorker";
import Loader from "../../loader/Loader";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import ISlot from "../../../interface/ISlot";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { FaTools } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../../utils/capitalize";
import { IBooking } from "../../../interface/Booking";
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

const StyledDatePicker = styled(DatePicker)({
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
    location: "",
    comments: "",
  });
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [availableSlots, setAvailableSlots] = useState<ISlot[]>([]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const userId = useSelector((state: RootState) => state.userInfo.userInfo._id);

  // console.log(userId);

  const fetchWorker = async () => {
    if (workerId) {
      try {
        setLoading(true);
        const response = await fetchWorkerDatabyId(workerId);
        setWorker(response);
      } catch (error) {
        console.error("Error fetching worker data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchSlot = async () => {
    if (workerId) {
      try {
        setLoading(true);
        const response = await fetchSlotById(workerId);
        // console.log("iam res", response);
        setAvailableSlots(response);
      } catch (error) {
        console.error("Error fetching slots data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchWorker();
    fetchSlot();
  }, [workerId]);

  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        break;
      case "email":
        if (!value.trim()) error = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(value)) error = "Email is invalid";
        break;
      case "phone":
        if (!value.trim()) error = "Phone number is required";
        else if (!/^\d{10}$/.test(value))
          error = "Phone number must be 10 digits";
        break;
      case "address":
        if (!value.trim()) error = "Address is required";
        break;
      case "selectedSlot":
        if (!value) error = "Please select a slot";
        break;
      case "location":
        if (!value.trim()) error = "Location is required";
        break;
    }
    return error;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    const requiredFields = [
      "name",
      "email",
      "phone",
      "address",
      "selectedSlot",
      "location",
    ];
    const isValid = requiredFields.every(
      (field) =>
        bookingInfo[field as keyof typeof bookingInfo] && !errors[field]
    );
    setIsFormValid(isValid);
  }, [bookingInfo, errors]);

  const shouldDisableDate = (date: Dayjs | null): boolean => {
    if (!date) return false;
    const tomorrow = dayjs().add(1, "day").startOf("day");
    const nextWeek = tomorrow.add(6, "day").endOf("day");
    return date.isBefore(tomorrow) || date.isAfter(nextWeek);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const filteredSlots = availableSlots.filter((slot) => {
    const slotDate = dayjs(slot.date);
    return selectedDate !== null && slotDate.isSame(selectedDate, "day");
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("touched submit", isFormValid);
    if (!isFormValid) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    try {
      const bookingData: IBooking  = { 
        ...bookingInfo,
        date: selectedDate ? selectedDate.format("YYYY-MM-DD") : "", 
        workerId: workerId || "", 
      };
      // console.log("bookingData:", bookingData);

      const response = await submitBooking(bookingData, userId);
      if (response.status === 200) {
        console.log("resp::--", response);
        navigate(`/success/${response.data._id}`);
      }

      // stoast.success("Booking submitted successfully");
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-2xl font-bold text-center text-custom_navyBlue mb-8">
        Worker Availability and Booking
      </h1>

      <div className="grid md:grid-cols-2 text-custom_navyBlue gap-8">
        {/* Worker Details Card */}
        <div className="mb-8 p-4 border-2 bg-custom_bg_blue border-custom_lightBlue shadow-lg rounded-sm">
          {worker ? (
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <img
                src={worker.profilePicture}
                alt={worker.name}
                className="w-24 h-24 rounded-full mb-4 sm:mb-0 sm:mr-4"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-xl font-semibold">{worker.name}</h2>
                {/* <p className="text-gray-700">
                  Expertise: {worker.service.name}
                </p> */}
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
                          i < Math.round(worker.experience)
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
        <div className="mb-8 p-4 border-2 border-custom_lightBlue bg-custom_bg_blue shadow-md rounded-sm">
          <h2 className="text-xl font-semibold mb-4">Service Details</h2>
          {worker ? (
            <div className="flex items-start">
              <div className="mr-4">
                <FaTools className="text-5xl text-custom_buttonColor" />
              </div>
              <div>
                <p className="text-gray-700 ">
                  <span className="font-semibold ">Service:</span>{" "}
                  {capitalizeFirstLetter(worker.service.name)}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Description:</span>{" "}
                  {worker.service.description}
                </p>
                <p className="text-gray-700">{worker.wageDay}/Day</p>
              </div>
            </div>
          ) : (
            <p>No service details available.</p>
          )}
        </div>
      </div>

      {/* Booking Form */}
      <div className="p-4 border-2 border-custom_lightBlue shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-custom_navyBlue">
          Book a Service
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledTextField
              fullWidth
              label="Name"
              name="name"
              value={bookingInfo.name}
              onChange={handleInputChange}
              // required
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
            />
            <StyledTextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={bookingInfo.email}
              onChange={handleInputChange}
              // required
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StyledTextField
              fullWidth
              label="Phone Number"
              name="phone"
              value={bookingInfo.phone}
              onChange={handleInputChange}
              // required
              variant="outlined"
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <StyledTextField
              fullWidth
              label="Location"
              name="location"
              value={bookingInfo.location}
              onChange={handleInputChange}
              // required
              variant="outlined"
              error={!!errors.location}
              helperText={errors.location}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <StyledDatePicker
                label="Select Date"
                value={selectedDate}
                onChange={handleDateChange}
                shouldDisableDate={shouldDisableDate}
              />
            </LocalizationProvider>
            <FormControl
              fullWidth
              variant="outlined"
              error={!!errors.selectedSlot}
            >
              <InputLabel>Select Slot</InputLabel>
              <Select
                name="selectedSlot"
                value={bookingInfo.selectedSlot}
                onChange={handleSelectChange}
                label="Select Slot"
                // required
                inputProps={{
                  sx: {
                    fontSize: "0.75rem",
                  },
                }}
                sx={{
                  height: "50px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#BFDBFE",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3B82F6",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#3B82F6",
                  },
                  "& .MuiSelect-select": {
                    paddingTop: "12px",
                    paddingBottom: "12px",
                  },
                }}
              >
                {filteredSlots.length > 0 ? (
                  filteredSlots.map((slot, index) => (
                    <MenuItem key={index} value={slot._id}>
                      {slot.time}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    No available slots
                  </MenuItem>
                )}
              </Select>
              {errors.selectedSlot && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.selectedSlot}
                </p>
              )}
            </FormControl>
          </div>
          <StyledTextField
            fullWidth
            label="Address"
            name="address"
            value={bookingInfo.address}
            onChange={handleInputChange}
            // required
            variant="outlined"
            error={!!errors.address}
            helperText={errors.address}
          />
          <StyledTextField
            fullWidth
            label="Comments"
            name="comments"
            value={bookingInfo.comments}
            onChange={handleInputChange}
            variant="outlined"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkerAvailability;
