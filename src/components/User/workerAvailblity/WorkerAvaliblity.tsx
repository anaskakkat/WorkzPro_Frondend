import React, { useEffect, useState } from "react";
import { fetchWorkerDatabyId } from "../../../api/user";
import { LeaveType, ServiceData, WorkingDayType } from "../../../types/IWorker";
import Loader from "../../loader/Loader";
import { useParams } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { format, addMinutes, isBefore, startOfDay } from "date-fns";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  setSelectedServicesUser,
  setSelectedSlotsUser,
  setTimeSlotsUser,
} from "../../../redux/slices/userBookingSlot";

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
  const dispatch = useDispatch();
  useEffect(() => {
    fetchWorker();
  }, [workerId]);

  useEffect(() => {
    if (selectDate) {
      generateTimeSlots();
    }
  }, [selectDate, workDays, bufferTime]);

  const fetchWorker = async () => {
    if (workerId) {
      try {
        setLoading(true);
        const response = await fetchWorkerDatabyId(workerId);
        setBufferTime(response.configuration.bufferTime);
        setLeaves(response.configuration.leaves);
        setServices(response.configuration.services);
        setWorkDays(response.configuration.workingDays);
      } catch (error) {
        console.error("Error fetching worker data:", error);
      } finally {
        setLoading(false);
      }
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

    let current = addMinutes(
      startOfDay(selectDate),
      parseTime(workingHours.start)
    );
    const end = addMinutes(startOfDay(selectDate), parseTime(workingHours.end));

    while (isBefore(current, end)) {
      const start = format(current, "HH:mm");
      const slotDuration = selectedService
        ? selectedService.slot * 60
        : 30 * 60;
      const nextSlot = addMinutes(current, slotDuration);
      if (!isBefore(nextSlot, end)) break;
      const slotEnd = format(nextSlot, "HH:mm");
      const slot = `${start} - ${slotEnd}`;
      slots.push(slot);
      current = addMinutes(nextSlot, bufferTime);
    }

    setTimeSlots(slots);
  };

  const parseTime = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
    console.log("slot----", typeof slot);

    dispatch(setTimeSlotsUser(slot));
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
  const formatTimeSlot = (slot: string) => {
    const [start, end] = slot.split(" - ");
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12; // Convert to 12-hour format
      return `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${period}`;
    };
    return `${formatTime(start)} - ${formatTime(end)}`;
  };
  if (loading) {
    return (
      <div className="min-w-full">
        <Loader />
      </div>
    );
  }
  // console.log(
  //   "full data----",
  //   selectedService,
  //   typeof selectedService,
  //   "--",
  //   selectDate,
  //   typeof selectDate,
  //   "---",
  //   selectedSlot,
  //   typeof selectedSlot
  // );

  const minDate = dayjs().add(1, "day");
  const maxDate = dayjs().add(7, "day");

  return (
    <div className="flex flex-col px-7 min-w-96">
      <h2 className="font-semibold mt-4 text-custom_navyBlue">
        Book a Service
      </h2>
      <hr />
      <div className="flex flex-col mt-2">
        <div className="">
          <label
            htmlFor="service"
            className="block text-sm font-medium text-blue-700"
          >
            Select Service
          </label>
          <select
            id="service"
            name="service"
            className="w-full mt-1 p-2 border rounded-lg border-blue-400"
            onChange={handleServiceChange}
            value={selectedService?._id || ""}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service._id} value={service._id}>
                {service.service} ({service.slot} hours {service.amount})
              </option>
            ))}
          </select>
        </div>

        <div className=" mt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              minDate={minDate}
              maxDate={maxDate}
              label="Select a date"
              value={value}
              onChange={handleDateChange}
              shouldDisableDate={isDateDisabled}
            />
          </LocalizationProvider>
        </div>
      </div>

      {selectDate && timeSlots.length > 0 && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-custom_navyBlue">
            Available Time Slots
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot, index) => (
              <div
                key={index}
                onClick={() => handleSlotClick(slot)}
                className={`p-2 border border-blue-200 font-medium rounded-lg cursor-pointer transition-colors duration-300 text-center hover:bg-blue-200 ${
                  slot === selectedSlot
                    ? "bg-blue-500 text-white border-blue-600"
                    : "bg-white text-gray-800 border-gray-300"
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
