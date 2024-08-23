import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

import { fetchSlotById, fetchWorkerDatabyId } from "../../../api/user";
import IWorker from "../../../types/IWorker";
import Loader from "../../loader/Loader";
import { FaTools } from "react-icons/fa";
import { capitalizeFirstLetter } from "../../../utils/capitalize";
import { useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const WorkerAvailability: React.FC = () => {
  const { workerId } = useParams<{ workerId: string }>();
  const [worker, setWorker] = useState<IWorker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDate, setSelectedDate] = useState(null);

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
        console.log("iam res", response);
        // const filteredSlots = response.filter((slot: ISlot) => !slot.isBooked);
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
      <div className="p-4 border-2 border-custom_lightBlue shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-custom_navyBlue">
          Book a Service
        </h2>
        <DatePicker
        selected={selectedDate}
        // onChange={date => setSelectedDate(date)}
        inline
        className=""
      />
      </div>
    </div>
  );
};

export default WorkerAvailability;
