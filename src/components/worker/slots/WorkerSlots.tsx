import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { deleteSlot, fetchSlots, setSlot } from "../../../api/worker";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import moment from "moment";
import ISlot from "../../../interface/ISlot";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const WorkerSlots: React.FC = () => {
  const [todaySlots, setTodaySlots] = useState<ISlot[]>([]);

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  });
  const [open, setOpen] = useState(false);
  const [slots, setSlots] = useState<ISlot[]>([]);
  const [filteredSlots, setFilteredSlots] = useState<ISlot[]>([]);
  const [newSlot, setNewSlot] = useState({
    date: moment().add(1, "days").format("YYYY-MM-DD"),
    time: "fullDay" as "fullDay" | "morning" | "afternoon",
  });

  const workerId = useSelector(
    (state: RootState) => state.workerInfo.workerInfo._id
  );
  // console.log(workerId);

  const fetchWorkerSlots = async () => {
    try {
      const response = await fetchSlots(workerId);
      // console.log("resp--slot--", response);
      setSlots(response);
    } catch (error) {
      console.error("Error fetching slots:", error);
    }
  };
  useEffect(() => {
    const today = moment().format("YYYY-MM-DD");
    const filteredTodaySlots = slots.filter(
      (slot) => moment(slot.date).format("YYYY-MM-DD") === today
    );

    // console.log("filteredTodaySlots:", filteredTodaySlots);
    setTodaySlots(filteredTodaySlots);
  }, [slots]);
  useEffect(() => {
    fetchWorkerSlots();
  }, []);

  useEffect(() => {
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
    const filtered = slots.filter(
      (slot) => moment(slot.date).format("YYYY-MM-DD") === formattedDate
    );
    setFilteredSlots(filtered);
  }, [selectedDate, slots]);

  const generateWeekDates = () => {
    const today = new Date();
    const weekDates = [];

    for (let i = 1; i <= 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      weekDates.push(currentDate);
    }

    return weekDates;
  };

  const weekDates = generateWeekDates();
  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getDayNumber = (date: Date) => {
    return date.getDate();
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    if (!selectedDate) return;
    const formattedDate = moment(selectedDate).format("YYYY-MM-DD");

    const createdSlot: ISlot = {
      date: formattedDate,
      time: newSlot.time,
      _id: "",
      slots: [],
      booked: [],
    };

    try {
      await setSlot(createdSlot, workerId);
      setOpen(false);
      fetchWorkerSlots();
    } catch (error) {
      console.error("Error creating slot:", error);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
         await deleteSlot(slotId);
        fetchWorkerSlots();
        toast.success("Deleted! Your slot has been deleted");
      } catch (error) {
        console.error("Error deleting slot:", error);
      }
    }
  };


  return (
    <div className="container flex justify-center lg:my-8 my-2 h-auto w-fit p-8 sm:py-4 mx-auto border-2 gap-10 border-custom_lightBlue overflow-hidden">
      <div className=" container text-center flex border-2 w-auto  p-6">
        <div className="justify-center flex-col flex">
          <h4 className="text-custom_navyBlue font-extrabold align-bottom my-2">
            Today's Slots
          </h4>
          <h5 className="my-1  text-custom_navyBlue">
            {new Date().toLocaleDateString()}
          </h5>
          {todaySlots.length > 0 ? (
            <ul>
              {todaySlots.map((slot, index) => (
                <li key={index} className="">
                  <Button aria-readonly className="flex items-center  gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    {slot.time}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-blue-700 font-normal mb-2">
              No slots created for today.
            </p>
          )}
        </div>
      </div>

      <div className="worker-slots">
        <h1 className="text-center font-medium text-custom_navyBlue font my-4">
          Add Work Slots
        </h1>
        <div className="flex space-x-2">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`flex group ${
                date.toDateString() === selectedDate.toDateString()
                  ? "bg-custom_buttonColor shadow-lg"
                  : "hover:bg-custom_navyBlue"
              } rounded-full mx-1 transition-all duration-300 cursor-pointer justify-center w-16`}
              onClick={() => handleDateClick(date)}
            >
              <div className="flex items-center px-4 py-4">
                <div className="text-center">
                  <p
                    className={`text-white ${
                      date.toDateString() === selectedDate.toDateString()
                        ? "text-white font-semibold"
                        : "group-hover:text-white text-sm group-hover:font-semibold"
                    }`}
                  >
                    {getDayName(date)}
                  </p>
                  <p
                    className={`text-gray-900 ${
                      date.toDateString() === selectedDate.toDateString()
                        ? "text-white mt-3 font-bold"
                        : "mt-3 group-hover:text-white group-hover:font-bold"
                    }`}
                  >
                    {getDayNumber(date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="my-8 w-full  p-4">
          <h2 className="text-custom_navyBlue mb-1">
            Work Slots Created For {selectedDate?.toLocaleDateString() || ""}
          </h2>
          {filteredSlots.length > 0 ? (
            <ul>
              {filteredSlots.map((slot, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center my-2"
                >
                  <Button aria-readonly className="flex items-center gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                      />
                    </svg>
                    {slot.time}
                  </Button>
                  {/* <span className="py-2 text-center px-2 bg-blue-500 text-white">{slot.time}</span> */}
                  <div className="flex gap-2">
                    {/* <Button
                      variant="outlined"
                      color="primary"
                      // onClick={() => handleEditSlot(slot)}
                    >
                      Edit
                    </Button> */}
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDeleteSlot(slot._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-800 font-normal mb-2">
              No slots created for the selected date.
            </p>
          )}
          {filteredSlots.length > 0 ? (
            ""
          ) : (
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Add
            </Button>
          )}
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
              border: "2px solid #77B5FE",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" className="text-custom_navyBlue">
              Create New Slot
            </Typography>
            <div className="flex justify-between mt-4">
              <Button
                variant="contained"
                color={newSlot.time === "fullDay" ? "error" : "primary"}
                onClick={() =>
                  setNewSlot({
                    ...newSlot,
                    time: "fullDay" as "fullDay" | "morning" | "afternoon",
                  })
                }
              
              >
                Full Day
              </Button>
              <Button
                variant="contained"
                color={newSlot.time === "morning" ? "error" : "primary"}
                onClick={() =>
                  setNewSlot({
                    ...newSlot,
                    time: "morning" as "fullDay" | "morning" | "afternoon",
                  })
                }
              
              >
                Morning
              </Button>
              <Button
                variant="contained"
                color={newSlot.time === "afternoon" ? "error" : "primary"}
                onClick={() =>
                  setNewSlot({
                    ...newSlot,
                    time: "afternoon" as "fullDay" | "morning" | "afternoon",
                  })
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
