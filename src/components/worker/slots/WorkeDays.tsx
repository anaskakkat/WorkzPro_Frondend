import React, { useState, useEffect } from "react";
import { WorkingDayType } from "../../../types/ISlot";
import IWorker from "../../../types/IWorker";
import toast from "react-hot-toast";

type PropType = {
  workingDaysProp: WorkingDayType[];
  slotSizeProp: number;
  bufferTimeProp: number;
  setWorker: React.Dispatch<React.SetStateAction<IWorker | null>>;
};

const WorkerDays: React.FC<PropType> = ({
  workingDaysProp,
  slotSizeProp,
  bufferTimeProp,
  setWorker,
}) => {
  const [dayOfWeek] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);

  const [workingDays, setWorkingDays] =
    useState<WorkingDayType[]>(workingDaysProp);
  const [isEditing, setIsEditing] = useState(false);
  const [slotSize, setSlotSize] = useState(slotSizeProp);
  const [bufferTime, setBufferTime] = useState(bufferTimeProp);

  useEffect(() => {
    setWorkingDays(workingDaysProp);
    setSlotSize(slotSizeProp);
    setBufferTime(bufferTimeProp);
  }, [workingDaysProp, slotSizeProp, bufferTimeProp]);

  const handleToggleChange = (index: number) => {
    if (!isEditing) return;
    const updatedWorkingDays = [...workingDays];
    updatedWorkingDays[index].isWorking = !updatedWorkingDays[index].isWorking;
    setWorkingDays(updatedWorkingDays);
  };

  const handleTimeChange = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    if (!isEditing) return;
    const updatedWorkingDays = [...workingDays];
    updatedWorkingDays[index][field] = value;
    setWorkingDays(updatedWorkingDays);
  };
  const validateTimes = (days: WorkingDayType[]): boolean => {
    for (const day of days) {
      if (day.isWorking) {
        const start = new Date(`1970-01-01T${day.start}`);
        const end = new Date(`1970-01-01T${day.end}`);
        if (start >= end) {
          toast.error(`Invalid time range for ${dayOfWeek[days.indexOf(day)]}`);
          return false;
        }
      }
    }
    return true;
  };

  const saveDataToServer = async (data: {
    workingDays: WorkingDayType[];
    slotSize: number;
    bufferTime: number;
  }) => {
    try {
      console.log("saveDataToServer------", data);

      const response = await fetch("/api/save-worker-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save data");
      }
      return await response.json();
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  };

  const toggleEditMode = async () => {
    if (isEditing) {
      if (validateTimes(workingDays)) {
        const dataToSave = { workingDays, slotSize, bufferTime };
        try {
          const result = await saveDataToServer(dataToSave);
          setIsEditing(false);
          setWorker((prevWorker) => ({
            ...prevWorker!,
            workingDays,
            slotSize,
            bufferTime,
          }));
          toast.success("Changes saved successfully!");
        } catch (error) {
          toast.error("Failed to save data. Please try again.");
        }
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="flex flex-col items-start px-4 bg-white rounded-lg shadow-lg space-y-2">
      <div className="flex my-2 w-full flex-row justify-between">
        <h4 className="text-lg font-semibold text-custom_navyBlue">
          Working Days
        </h4>
        <button
          type="button"
          onClick={toggleEditMode}
          className={`text-custom_navyBlue hover:text-white border  border-blue-500 hover:bg-custom_buttonColor focus:ring-1 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-1 text-center ${
            isEditing ? "bg-custom_buttonColor text-white" : ""
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="flex flex-row  w-full justify-between">
        <div className="tile flex bg-orange-50 w-fit  h-fit text-custom_navyBlue border border-orange-300 rounded-lg py-2 px-3 gap-3">
          <h3 className="font-semibold ">
            Slot Size<span className="text-sm font-light">(in-Hour)</span>-{" "}
          </h3>
          {isEditing ? (
            <input
              type="number"
              value={slotSize}
              onChange={(e) => setSlotSize(Number(e.target.value))}
              className="w-11 px-1 border rounded"
              min="0"
              max="10"
            />
          ) : (
            <p>{slotSize}</p>
          )}
        </div>
        <div className="flex   bg-orange-50  h-fit text-custom_navyBlue border border-orange-300 rounded-lg py-2 px-3 gap-3">
          <h3 className="font-semibold">
            Interval<span className="text-sm font-light">(in-Minutes)</span>-
          </h3>
          {isEditing ? (
            <input
              type="number"
              value={bufferTime}
              onChange={(e) => setBufferTime(Number(e.target.value))}
              className="w-11 px-1 border rounded"
              min="0"
            />
          ) : (
            <p>{bufferTime}</p>
          )}
        </div>
      </div>
      {workingDays.map((day, index) => (
        <div
          key={day._id}
          className="flex items-center p-2 bg-blue-100 rounded-lg justify-between shadow-lg space-x-6 w-full"
        >
          <div className="relative ">
            <label className="inline-flex items-center mr-5 cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={day.isWorking}
                onChange={() => handleToggleChange(index)}
                disabled={!isEditing}
              />
              <div
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out ${
                  day.isWorking ? "bg-blue-500" : "bg-gray-300"
                } ${!isEditing ? "opacity-50" : ""}`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full transform transition-transform duration-300 ease-in-out ${
                    day.isWorking ? "translate-x-full" : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-sm text-gray-900">
                {dayOfWeek[index]}
              </span>
            </label>
          </div>

          <div className="flex flex-row gap-1">
            <div className="flex items-center justify-start">
              <label
                htmlFor={`fromTime-${index}`}
                className="mr-1 text-gray-700 text-sm"
              >
                From:
              </label>
              <input
                type="time"
                id={`fromTime-${index}`}
                value={day.start}
                onChange={(e) =>
                  handleTimeChange(index, "start", e.target.value)
                }
                className={`border  max-h-8 text-sm font-light border-gray-300 rounded-md px-1 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing || !day.isWorking ? "bg-gray-100" : ""
                }`}
                disabled={!isEditing || !day.isWorking}
              />
            </div>

            <div className="flex items-center">
              <label
                htmlFor={`toTime-${index}`}
                className="mr-1 text-gray-700 text-sm"
              >
                To:
              </label>
              <input
                type="time"
                id={`toTime-${index}`}
                value={day.end}
                onChange={(e) => handleTimeChange(index, "end", e.target.value)}
                className={`border font-light max-h-8 text-sm border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !isEditing || !day.isWorking ? "bg-gray-100" : ""
                }`}
                disabled={!isEditing || !day.isWorking}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerDays;
