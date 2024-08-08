import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { fetchSlots, ISlot, setSlot } from "../../../api/worker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

const WorkerSlots: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [newSlot, setNewSlot] = useState({
    date: selectedDate || new Date(),
    time: "fullDay" as "fullDay" | "morning" | "afternoon",
  });

  const workerId = useSelector(
    (state: RootState) => state.workerInfo.workerInfo.id
  );

  const fetchWorkerSlots = async () => {
    try {
      const response = await fetchSlots(workerId);
      console.log(response);
      
      setSlots(response.slots);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };

  useEffect(() => {
    fetchWorkerSlots();
  }, []);

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };

    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(/,/g, "");

    return formattedDate;
  };

  const generateWeekDates = () => {
    const today = new Date();
    const weekDates = [];

    for (let i = 0; i <= 10; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      weekDates.push(currentDate);
    }

    return weekDates;
  };

  const weekDates = generateWeekDates();
  const today = new Date();

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getDayNumber = (date: Date) => {
    return date.getDate();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setNewSlot({ ...newSlot, date: date });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedDate) return;

    const formattedDate = formatDate(selectedDate);

    const createdSlot: ISlot = {
      data: {
        date: formattedDate,
        time: newSlot.time,
      },
      workerId: workerId,
    };

    try {
      // const response =
       await setSlot(createdSlot);
      // console.log("Slot created:", response);
      setOpen(false);
      fetchWorkerSlots(); // Refresh the slots after adding a new one
    } catch (error) {
      console.error("Error creating slot:", error);
    }
  };

  const filterSlotsByDate = () => {
    if (!selectedDate) return [];

    const formattedDate = formatDate(selectedDate);
    return slots.filter(
      (slot) => slot.data.date === formattedDate
    );
  };

  const availableSlots = filterSlotsByDate();

  return (
    <div className="container flex justify-center mx-auto border-4 overflow-hidden">
      <div className="worker-slots">
        <h1 className="text-center my-6">Add Work Slots</h1>
        <div className="flex space-x-2">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`flex group ${
                date.toDateString() === today.toDateString()
                  ? "bg-purple-700 shadow-lg"
                  : "hover:bg-purple-500 hover:shadow-lg hover-dark-shadow"
              } rounded-full mx-1 transition-all duration-300 cursor-pointer justify-center w-16`}
              onClick={() => handleDateClick(date)}
            >
              <div className="flex items-center px-4 py-4">
                <div className="text-center">
                  <p
                    className={`text-gray-900 ${
                      date.toDateString() === today.toDateString()
                        ? "text-gray-100 font-semibold"
                        : "group-hover:text-gray-100 text-sm group-hover:font-semibold"
                    } transition-all duration-300`}
                  >
                    {getDayName(date)}
                  </p>
                  <p
                    className={`text-gray-900 ${
                      date.toDateString() === today.toDateString()
                        ? "text-gray-100 mt-3 font-bold"
                        : "mt-3 group-hover:text-gray-100 group-hover:font-bold"
                    } transition-all duration-300`}
                  >
                    {getDayNumber(date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-2 p-8">
          <h2>Work Slots for {selectedDate?.toLocaleDateString() || ""}</h2>
          {availableSlots.length > 0 ? (
            <ul>
              {availableSlots.map((slot, index) => (
                <li key={index}>
                  {slot.data.time === "fullDay"
                    ? "Full Day"
                    : slot.data.time === "morning"
                    ? "Morning"
                    : "Afternoon"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No slots available for the selected date.</p>
          )}
          <Button variant="contained" color="primary" onClick={handleOpen}>
            Add
          </Button>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create New Slot
            </Typography>
            <div className="flex justify-between mt-4">
              <Button
                variant="contained"
                color={newSlot.time === "fullDay" ? "secondary" : "primary"}
                onClick={() =>
                  setNewSlot({
                    ...newSlot,
                    time: "fullDay" as "fullDay" | "morning" | "afternoon",
                  })
                }
                className={
                  newSlot.time === "fullDay" ? "bg-blue-500 text-white" : ""
                }
              >
                Full Day
              </Button>
              <Button
                variant="contained"
                color={newSlot.time === "morning" ? "secondary" : "primary"}
                onClick={() =>
                  setNewSlot({
                    ...newSlot,
                    time: "morning" as "fullDay" | "morning" | "afternoon",
                  })
                }
                className={
                  newSlot.time === "morning" ? "bg-blue-500 text-white" : ""
                }
              >
                Morning
              </Button>
              <Button
                variant="outlined"
                color={newSlot.time === "afternoon" ? "secondary" : "primary"}
                onClick={() =>
                  setNewSlot({
                    ...newSlot,
                    time: "afternoon" as "fullDay" | "morning" | "afternoon",
                  })
                }
                className={
                  newSlot.time === "afternoon" ? "bg-blue-500 text-white" : ""
                }
              >
                Afternoon
              </Button>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default WorkerSlots;
