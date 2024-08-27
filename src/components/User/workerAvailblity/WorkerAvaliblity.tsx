import React, { useEffect, useState } from "react";
import { startOfDay, addMinutes, isBefore, format } from "date-fns";
import { fetchWorkerDatabyId } from "../../../api/user";
import { ServiceData, WorkingDayType } from "../../../types/IWorker";
import Loader from "../../loader/Loader";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
const WorkerAvailability: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  // const [worker, setWorker] = useState<IWorker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [services, setServices] = useState<ServiceData[]>([]);
  const [selectDate, setSelectDate] = useState<Date | undefined>(undefined);
  const [workDays, setWorkDays] = useState<WorkingDayType[]>([]);
  const [bufferTime, setBufferTime] = useState<number>(0);
  const [slotSize, setSlotSize] = useState<number>(0);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // const [slotCount, setSlotCount] = useState(0);
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
        // setWorker(response);
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

  return (
    <div className=" flex flex-col px-7 min-w-96">
      {/* Left Side */}
      <h2 className=" font-semibold mt-4 text-custom_navyBlue">
        Book a Service
      </h2>
      <hr />
      <div className="flex flex-col mt-2 ">
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
            onChange={(_e) => {}}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service._id} value={service.amount}>
                {service.service}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <label
            htmlFor="date"
            className="block text-sm font-medium mt-1 text-blue-700"
          >
            Select Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            min={new Date().toISOString().split("T")[0]}
            max={
              new Date(new Date().setMonth(new Date().getMonth() + 1))
                .toISOString()
                .split("T")[0]
            } // Example max date
            className="w-full mt-1 p-2 border rounded-lg border-blue-400"
            onChange={handleDateChange}
          />
        </div>
      </div>

      {selectDate && timeSlots.length > 0 && (
        <div className="mt-4">
          <h3 className=" font-semibold mb-2 text-custom_navyBlue">
            Available Time Slots
          </h3>
          <div className="grid grid-cols-2 gap-2 ">
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
                {slot}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default WorkerAvailability;
