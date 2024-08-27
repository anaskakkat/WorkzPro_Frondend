import { useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import toast from "react-hot-toast";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { addLeaves, deleteLeves, getLeaves } from "../../../api/worker";
import { LeaveType } from "../../../types/IWorker";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Popover, Typography } from "@mui/material";

const WeekDays = () => {
  const [weekdaysData, setWeekdaysData] = useState<LeaveType[]>([]);
  const workerId = useSelector(
    (state: RootState) => state.workerInfo.workerInfo._id
  );
  // State for modal visibility
  const [open, setOpen] = useState(false);
  const [newDate, setNewDate] = useState<string>("");
  const [newReason, setNewReason] = useState("");
  const [disabledDates, setDisabledDates] = useState<string[]>([]);
  const [deletePopoverId, setDeletePopoverId] = useState<string | null>(null);
  const [deleteAnchorEl, setDeleteAnchorEl] =
    useState<HTMLButtonElement | null>(null);

  const handleDelete = async (leaveId: string) => {
    try {
      const response = await deleteLeves(workerId, leaveId);
      // console.log("resss--", response);
      if (response.status === 200) {
        toast.success(response.message);
        fetchLeaves();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    leaveId: string
  ) => {
    setDeleteAnchorEl(event.currentTarget);
    setDeletePopoverId(leaveId);
  };

  const handleDeleteConfirm = async () => {
    if (deletePopoverId) {
      await handleDelete(deletePopoverId);
      setDeletePopoverId(null);
      setDeleteAnchorEl(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletePopoverId(null);
    setDeleteAnchorEl(null);
  };
  const handleAdd = async () => {
    if (newDate && newReason.trim()) {
      const newEntry = {
        date: newDate,
        reason: newReason.trim(),
      };
      const response = await addLeaves(workerId, newEntry);
      if (response) {
        setNewDate("");
        setNewReason("");
        setOpen(false);
        toast.success("Added new Leave successfully");
        fetchLeaves();
      }
    } else {
      toast.error("Please provide both date and reason");
    }
  };
  useEffect(() => {
    fetchLeaves();
  }, []);
  const fetchLeaves = async () => {
    try {
      const res = await getLeaves(workerId);
      if (res) {
        setWeekdaysData(res.data);
        const dates = res.data.map(
          (leave: { date: string }) =>
            new Date(leave.date).toISOString().split("T")[0]
        );
        setDisabledDates(dates);
      }
      // console.log("res---", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const isDateDisabled = (date: string) => {
    console.log(date);

    return disabledDates.includes(date);
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const oneMonthFromToday = new Date(today);
  oneMonthFromToday.setMonth(today.getMonth() + 1);
  const maxDate = oneMonthFromToday.toISOString().split("T")[0];

  console.log("is disable", isDateDisabled);
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setNewDate(date.toISOString().split("T")[0]);
    } else {
      setNewDate("");
    }
  };
  return (
    <div className="w-full h-3/4 flex flex-col bg-white rounded-lg shadow-2xl">
      <div className="px-3 flex bg-blue-100 w-full justify-between rounded-t-lg items-center py-2">
        <h3 className="font-semibold text-custom_navyBlue">Upcoming Leaves</h3>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white font-medium px-3 py-1 border border-blue-500 hover:border-transparent rounded-lg"
          onClick={() => setOpen(true)}
        >
          Add
        </button>
      </div>
      <hr />
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr className="text-sm text-gray-700">
              <th className="border-b px-4 py-2 font-medium text-left">Date</th>
              <th className="border-b px-4 py-2 text-left font-medium">
                Reason
              </th>
              <th className="border-b px-4 py-2 text-left font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {weekdaysData.length > 0 ? (
              weekdaysData.map((weekday, index) => (
                <tr
                  key={index}
                  className="border-b text-sm text-gray-600 hover:bg-blue-100"
                >
                  <td className="px-4 py-2">
                    {moment(weekday.date).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-4 py-2">{weekday.reason}</td>
                  <td className="flex items-center px-4 py-2">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => handleDeleteClick(e, weekday._id!)}
                    >
                      <DeleteOutlinedIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                  No leave records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for adding new entry */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="add-entry-modal"
      >
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className=" font-semibold mb-4">Add New Leaves</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Date</label>
              <DatePicker
                selected={newDate ? new Date(newDate) : null}
                onChange={handleDateChange}
                minDate={new Date(minDate)}
                maxDate={new Date(maxDate)}
                excludeDates={disabledDates.map((date) => new Date(date))}
                dateFormat="yyyy-MM-dd"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholderText="Select a date"
              />
            </div>
            <div className="mb-4">
              <TextField
                label="Reason"
                value={newReason}
                onChange={(e) => setNewReason(e.target.value)}
                fullWidth
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setOpen(false)}
                className="ml-2"
              >
                Cancel
              </Button>
              <Button variant="outlined" color="primary" onClick={handleAdd}>
                Add
              </Button>
            </div>
          </div>
        </div>
      </Modal>
      <Popover
        open={Boolean(deleteAnchorEl)}
        anchorEl={deleteAnchorEl}
        onClose={handleDeleteCancel}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="p-2">
          <Typography className="">
            Are you sure you want to delete this leave?
          </Typography>
          <div className="flex justify-end gap-2">
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDeleteCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default WeekDays;
