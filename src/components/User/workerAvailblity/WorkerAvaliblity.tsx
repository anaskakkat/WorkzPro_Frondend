import React, { useEffect, useState } from "react";
import { fetchBookingsByDate, fetchWorkerDatabyId } from "../../../api/user";
import { LeaveType, ServiceData, WorkingDayType } from "../../../types/IWorker";
import Loader from "../../loader/Loader";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { format, isBefore } from "date-fns";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setSelectedServicesUser,
  setSelectedSlotsUser,
  setTimeSlotsUser,
} from "../../../redux/slices/userBookingSlot";
import {
  calculateNextSlot,
  formatTimeSlot,
  getStartAndEndTimes,
  isSlotWithinWorkingHours,
} from "../../../utils/slotesCreationHelper";
import { Booking } from "../../../types/Booking";

const WorkerAvailability: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [selectDate, setSelectDate] = useState<Date | null>(null);
  const [workDays, setWorkDays] = useState<WorkingDayType[]>([]);
  const [bufferTime, setBufferTime] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [leaves, setLeaves] = useState<LeaveType[]>([]);
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [selectedService, setSelectedService] = useState<ServiceData | null>(
    null
  );
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectDate && workerId) {
      fetchBookedSlots(workerId, selectDate);
    }
  }, [selectDate, workerId]);

  useEffect(() => {
    if (selectDate) {
      generateTimeSlots();
    }
  }, [selectDate, workDays, bufferTime]);
  useEffect(() => {
    handleWorkerDataFetch();
  }, []);

  const fetchBookedSlots = async (workerId: string, date: Date) => {
    try {
      const response = await fetchBookingsByDate(workerId, date);
      if (response.status === 200) {
        setBookedSlots(
          response.booking.map((booking: Booking) => booking.slots)
        );
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    }
  };
  // console.log("--booked Slote----", bookedSlots);

  const handleWorkerDataFetch = async () => {
    if (!workerId) return console.log("no workerId");
    try {
      setLoading(true);
      const response = await fetchWorkerDatabyId(workerId);
      const { bufferTime, leaves, services, workingDays } =
        response.configuration;

      setBufferTime(bufferTime);
      setLeaves(leaves);
      setServices(services);
      setWorkDays(workingDays);
      if (selectDate) {
        await fetchBookedSlots(workerId, selectDate);
      }
    } catch (error) {
      console.error("Error fetching worker data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getWorkingHours = () => {
    if (selectDate) {
      const dayOfWeek = selectDate.getDay();
      return workDays[dayOfWeek];
    }
    return null;
  };

  const generateTimeSlots = () => {
    const slots: string[] = [];
    const workingHours = getWorkingHours();
    if (!workingHours || !selectDate || !workingHours.isWorking) return slots;

    const { start, end } = getStartAndEndTimes(selectDate, workingHours);

    let current = start;

    while (isBefore(current, end)) {
      const startTime = format(current, "HH:mm");
      const slotDuration = selectedService
        ? selectedService.slot * 60
        : 30 * 60;
      const { nextSlot, bufferEnd } = calculateNextSlot(
        current,
        slotDuration,
        bufferTime
      );
      if (!isSlotWithinWorkingHours(bufferEnd, end)) break;
      const endTime = format(nextSlot, "HH:mm");
      slots.push(`${startTime} - ${endTime}`);
      current = bufferEnd;
      setTimeSlots(slots);
    }
  };

  const handleSlotClick = (slot: string) => {
    if (!isSlotBooked(slot)) {
      setSelectedSlot(slot);
      dispatch(setTimeSlotsUser(slot));
    } else {
      toast.error("This slot is already booked");
    }
  };

  const handleDateChange = (newValue: Dayjs | null) => {
    if (!selectedService) {
      toast.error("Select a Service");
      return;
    }
    if (newValue) {
      setSelectDate(newValue.toDate());
      setValue(newValue);
      dispatch(setSelectedSlotsUser(newValue.format("YYYY-MM-DD")));
    }
  };

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedServiceId = e.target.value;
    const service = services.find((s) => s._id === selectedServiceId);
    setSelectedService(service || null);
    setSelectedSlot(null);
    setTimeSlots([]);
    dispatch(setSelectedServicesUser(service || null));
  };

  const isDateDisabled = (date: Dayjs) => {
    const isLeaveDay = leaves.some((leave) =>
      dayjs(leave.date).isSame(date, "day")
    );

    const dayOfWeek = date.day();
    const isNonWorkingDay = !workDays[dayOfWeek]?.isWorking;

    return isLeaveDay || isNonWorkingDay;
  };

  const isSlotBooked = (slot: string): boolean => {
    // console.log("Checking slot:----", slot);
    // console.log("Booked slots:----", bookedSlots);
    const [slotStart, slotEnd] = slot.split(" - ");
    return bookedSlots.some((bookedSlot) => {
      const [bookedStart, bookedEnd] = bookedSlot.split(" - ");
      return (
        (slotStart <= bookedStart && slotEnd > bookedStart) ||
        (slotStart >= bookedStart && slotStart < bookedEnd)
      );
    });
  };

  if (loading) {
    return (
        <Loader />
    );
  }

  const minDate = dayjs().add(1, "day");
  const maxDate = dayjs().add(7, "day");

  return (
    <div className="flex flex-col px-4 md:px-7">
  <h2 className="font-semibold mt-4 text-custom_navyBlue text-lg md:text-xl">
    Book a Service
  </h2>
  <hr />
  <div className="flex flex-col mt-2">
    <div>
      <label
        htmlFor="service"
        className="block text-sm w-fit md:w-full font-medium text-blue-700"
      >
        Select Service
      </label>
      <select
        id="service"
        name="service"
        className="w-fit md:w-full mt-1 p-2 border rounded-lg border-blue-400"
        onChange={handleServiceChange}
        value={selectedService?._id || ""}
      > 
        <option value="" className="w-fit md:w-full">Select a service</option>
        {services.map((service) => (
          <option key={service._id} value={service._id}>
            {service.service} ({service.slot} hours {service.amount})
          </option>
        ))}
      </select>
    </div>

    <div className="mt-4">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          label="Select a date"
          value={value}
          onChange={handleDateChange}
          shouldDisableDate={isDateDisabled}
          className="w-fit sm:w-full" // Ensure date picker is full width
        />
      </LocalizationProvider>
    </div>
  </div>

  {selectDate && timeSlots.length > 0 && (
    <div className="mt-4">
      <h3 className="font-semibold mb-2 text-custom_navyBlue text-lg md:text-xl">
        Available Time Slots
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            onClick={() => handleSlotClick(slot)}
            className={`p-2 border font-medium rounded-lg cursor-pointer transition-colors duration-300 text-center ${
              isSlotBooked(slot)
                ? "bg-red-200 text-red-800 border-red-300 cursor-not-allowed"
                : slot === selectedSlot
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-200"
            }`}
          >
            {formatTimeSlot(slot)}{" "}
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
};

export default WorkerAvailability;
