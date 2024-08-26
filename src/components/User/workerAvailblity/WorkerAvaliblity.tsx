import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  startOfDay,
  addMinutes,
  isBefore,
  format,
  addDays,
  addMonths,
} from "date-fns";
import { fetchWorkerDatabyId } from "../../../api/user";
import IWorker, { ServiceData, WorkingDayType } from "../../../types/IWorker";
import Loader from "../../loader/Loader";
import { FaTools } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../../utils/capitalize";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import BookingForm from "./BookingForm";
const WorkerAvailability: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const [worker, setWorker] = useState<IWorker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [slotCount, setSlotCount] = useState(0);
  const [selectDate, setSelectDate] = useState<Date | undefined>(undefined);
  const [workDays, setWorkDays] = useState<WorkingDayType[]>([]);
  const [bufferTime, setBufferTime] = useState<number>(0);
  const [slotSize, setSlotSize] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    description: "",
    houseNumber: "",
    street: "",
    location: "",
    city: "",
    state: "",
    pinCode: "",
  });
  useEffect(() => {
    fetchWorker();
    getWorkingHours();
  }, [workerId]);
  useEffect(() => {
    if (selectDate) {
      generateTimeSlots();
    }
  }, [selectDate, workDays, slotSize, bufferTime]);
  const fetchWorker = async () => {
    if (workerId) {
      try {
        setLoading(true);
        const response = await fetchWorkerDatabyId(workerId);
        // console.log("res--------------", response);

        setSlotSize(response.configuration.slotSize);
        setBufferTime(response.configuration.bufferTime);
        setWorker(response);
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
      // console.log("dayOfWeek", dayOfWeek,'----',workDays);

      let Workdaysdata = workDays[dayOfWeek];
      // console.log(Workdaysdata);

      return Workdaysdata;
    }
    return null;
  };
  const generateTimeSlots = () => {
    const slots: string[] = [];
    const workingHours = getWorkingHours();
    if (!workingHours) return slots;

    let current = addMinutes(
      startOfDay(selectDate!),
      parseTime(workingHours.start)
    );
    const end = addMinutes(
      startOfDay(selectDate!),
      parseTime(workingHours.end)
    );

    while (isBefore(current, end)) {
      const start = format(current, "HH:mm");
      const nextSlot = addMinutes(current, slotSize * 60);
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
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateString = e.target.value;
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      setSelectDate(date);
    } else {
      setSelectDate(undefined);
    }
  };

  const handleSlotClick = (slot: string) => {
    setSelectedSlot(slot);
  };

  if (loading) {
    return <Loader />;
  }
  // console.log("selectedDAte", selectDate);
  // const timeSlots = generateTimeSlots();
  // const minDate = format(addDays(new Date(), 1), "yyyy-MM-dd");
  // const maxDate = format(addMonths(new Date(), 1), "yyyy-MM-dd");

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
                <p className="text-gray-700">Location: {worker.locationName}</p>
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

      <div className="flex gap-8 p-4">
        {/* Left Side */}
        <div className="flex-1 p-4 border-2 border-custom_lightBlue shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-custom_navyBlue">
            Book a Service
          </h2>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700"
              >
                Select Service
              </label>
              <select
                id="service"
                name="service"
                className="w-full mt-1 p-2 border rounded-lg"
                onChange={(e) => {
                  /* handle service selection */
                }}
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service._id} value={service.amount}>
                    {service.service}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700"
              >
                Select Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                min={new Date().toISOString().split("T")[0]} // Example min date
                max={
                  new Date(new Date().setMonth(new Date().getMonth() + 1))
                    .toISOString()
                    .split("T")[0]
                } // Example max date
                className="w-full mt-1 p-2 border rounded-lg"
                onChange={handleDateChange}
              />
            </div>
          </div>

          {selectDate && timeSlots.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2 text-custom_navyBlue">
                Available Time Slots
              </h3>
              <div className="grid grid-cols-6 gap-4">
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    onClick={() => handleSlotClick(slot)}
                    className={`p-2 border rounded-lg cursor-pointer transition-colors duration-300 hover:bg-blue-200 ${
                      slot === selectedSlot
                        ? "bg-blue-500 text-white border-blue-600"
                        : "bg-white text-gray-800 border-gray-300"
                    }`}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side */}
        <BookingForm />
      </div>
    </div>
  );
};
export default WorkerAvailability;
