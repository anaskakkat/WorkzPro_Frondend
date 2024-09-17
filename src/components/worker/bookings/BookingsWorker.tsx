import { useEffect, useState } from "react";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import Person4Icon from "@mui/icons-material/Person4";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FaAddressBook } from "react-icons/fa";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DetailsIcon from "@mui/icons-material/Details";
import NumbersIcon from "@mui/icons-material/Numbers";
import { ArrowCircleDownSharp, ArrowCircleUpSharp } from "@mui/icons-material";
import moment from "moment";
import { Pagination } from "@mui/material";
import { Booking } from "../../../types/Booking";
import { useWorkerId } from "../../../redux/hooks/userSelectors";
import {
  completeBooking,
  confirmBooking,
  getWorkerBooking,
  rejectBooking,
} from "../../../api/worker";
import MapIcon from "@mui/icons-material/Map";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PopoverConfirmation from "./PopoverConfirmation";

const BookingsWorker = () => {
  const navigate = useNavigate();
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const workerId = useWorkerId();
  const bookingsPerPage = 3;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [confirmPopoverVisible, setConfirmPopoverVisible] = useState(false);
  const [rejectPopoverVisible, setRejectPopoverVisible] = useState(false);
  const [completePopoverVisible, setCompletePopoverVisible] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getWorkerBooking(workerId);
      if (response) {
        setBookings(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const toggleAccordion = (id: string) => {
    setOpenBookingId((prevId) => (prevId === id ? null : id));
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setOpenBookingId(null);
  };

  const startIndex = (page - 1) * bookingsPerPage;
  const endIndex = startIndex + bookingsPerPage;
  const currentBookings = bookings.slice(startIndex, endIndex);

  const handleConfirm = async () => {
    if (selectedBookingId) {
      try {
        console.log(`Booking ${selectedBookingId} confirmed`);
        const response = await confirmBooking(selectedBookingId);
        if (response && response.status === 200) {
          setSelectedBookingId(null);
          setConfirmPopoverVisible(false);
          fetchBookings();
        }
      } catch (error) {
        console.error("Error confirming booking", error);
      }
    }
  };
  const handleReject = async () => {
    if (selectedBookingId) {
      try {
        console.log(`Booking ${selectedBookingId} Reject`);
        const response = await rejectBooking(selectedBookingId);
        console.log("response----", response);
        if (response && response.status === 200) {
          setSelectedBookingId(null);
          setRejectPopoverVisible(false);
          fetchBookings();
          // console.log("finished");
        }
      } catch (error) {
        console.error("Error confirming booking", error);
      }
    }
  };
  const handleComplete = async () => {
    if (selectedBookingId) {
      try {
        console.log(`Booking ${selectedBookingId} completed`);
        const response = await completeBooking(selectedBookingId);
        if (response && response.status === 200) {
          toast.success(response.data);
          setSelectedBookingId(null);
          setCompletePopoverVisible(false);
          fetchBookings();
        }
      } catch (error) {
        console.error("Error completing booking", error);
      }
    }
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-24">
      <div className="container  font-semibold text-custom_navyBlue">
        My Bookings
      </div>
      <hr className="my-3" />
      <div className="flex flex-col gap-4">
        {currentBookings.map((booking) => (
          <div
            key={booking._id}
            className="container border-y shadow-lg bg-white rounded-2xl px-4 md:px-8 py-3 border-blue-400 text-custom_navyBlue"
          >
            <div className="flex flex-col md:flex-row justify-between mx-2 md:mx-4 gap-4">
              <div className="flex flex-col gap-1 capitalize text-sm font-medium  lg:min-w-48">
                <div className="flex items-center ">
                  <Person4Icon fontSize="inherit" className="mr-2" />
                  {booking.userId.userName}
                </div>
                <div className="flex items-center">
                  <MiscellaneousServicesIcon
                    fontSize="inherit"
                    className="mr-2"
                  />
                  {booking.workerId.service.name}
                </div>
                <div className="flex  items-center max-w-48 ">
                  <AssignmentIcon fontSize="inherit" className="mr-2" />
                  <span className="truncate">{booking.service.service}</span>
                </div>

                <div className="flex items-center max-w-44 my-1"></div>
              </div>
              <div className="flex flex-col gap-1">
                <kbd className="py-2 px-3 justify-center text-sm font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-lg flex items-center">
                  <CalendarMonthIcon fontSize="inherit" className="mr-2" />
                  {moment(booking.bookingDate).format("MMMM Do YYYY")}
                </kbd>
                <div className="py-2 px-3 justify-center text-xs font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-lg flex items-center">
                  <CalendarMonthIcon fontSize="inherit" className="mr-2" />
                  {booking.slots}
                </div>
              </div>
              <div className="flex flex-col gap-1 capitalize text-[13px] font-semibold ">
                <kbd
                  className={`px-4 mb-1 w-full text-center py-1 text-[13px] font-semibold rounded-lg self-start md:self-center ${
                    booking.status === "completed"
                      ? "text-green-900 bg-green-100 border border-green-600"
                      : booking.status === "pending"
                      ? "text-orange-800 bg-orange-100 border border-orange-400"
                      : booking.status === "confirmed"
                      ? "text-blue-800 bg-blue-100 border border-blue-400"
                      : booking.status === "cancelled"
                      ? "text-red-800 bg-red-100 border border-red-400"
                      : ""
                  }`}
                >
                  {booking.status}
                </kbd>

                {booking.status === "pending" && (
                  <>
                    <PopoverConfirmation
                      isOpen={
                        confirmPopoverVisible &&
                        selectedBookingId === booking._id
                      }
                      onClose={() => setConfirmPopoverVisible(false)}
                      onConfirm={handleConfirm}
                      title="Are you Sure?"
                      message="Confirm this Booking..."
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBookingId(booking._id!);
                          setConfirmPopoverVisible(true);
                        }}
                        className="capitalize text-blue-600 hover:text-white border hover:bg-blue-500 border-blue-600 rounded-lg self-start md:self-center w-full text-center py-1"
                      >
                        Accept
                      </button>
                    </PopoverConfirmation>

                    <PopoverConfirmation
                      isOpen={
                        rejectPopoverVisible &&
                        selectedBookingId === booking._id
                      }
                      onClose={() => setRejectPopoverVisible(false)}
                      onConfirm={handleReject}
                      title="Are you Sure?"
                      message="Reject this Booking..."
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedBookingId(booking._id!);
                          setRejectPopoverVisible(true);
                        }}
                        className="capitalize text-red-500 hover:text-white border hover:bg-red-500 border-red-600 rounded-lg self-start md:self-center w-full text-center py-1"
                      >
                        Reject
                      </button>
                    </PopoverConfirmation>
                  </>
                )}

                {booking.status === "confirmed" && (
                  <PopoverConfirmation
                    isOpen={
                      completePopoverVisible &&
                      selectedBookingId === booking._id
                    }
                    onClose={() => setCompletePopoverVisible(false)}
                    onConfirm={handleComplete}
                    title="Confirm Work Completion"
                    message="Are you sure the work is completed?"
                  >
                    <button
                      onClick={() => {
                        setSelectedBookingId(booking._id!);
                        setCompletePopoverVisible(true);
                      }}
                      className="border py-1 px-2 rounded-lg text-xs border-custom_navyBlue hover:bg-blue-100"
                    >
                      Work Completed
                    </button>
                  </PopoverConfirmation>
                )}
              </div>
            </div>

            <div className="">
              <button
                onClick={() => toggleAccordion(booking._id!)}
                className="items-center w-full font-semibold text-left transition-all ease-in cursor-pointer rounded-t-1 group text-black"
              >
                <span className="text-sm text-custom_buttonColor flex items-center px-4 hover:text-custom_navyBlue">
                  More Info
                  {openBookingId === booking._id ? (
                    <ArrowCircleUpSharp fontSize="inherit" className="ml-1" />
                  ) : (
                    <ArrowCircleDownSharp fontSize="inherit" className="ml-1" />
                  )}
                </span>
              </button>
              <button
                type="button"
                className="w-full gap-2 bg-white justify-center border-green-700 border text-green-700 hover:bg-green-800 hover:text-white  font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center me-2"
                onClick={() =>
                  navigate("/worker/direction", {
                    state: booking.address.location.coordinates,
                  })
                }
              >
                <span className="text-green-900 hover:text-white">
                  {" "}
                  <MapIcon fontSize="inherit" />
                </span>
                Map
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openBookingId === booking._id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="p-4 text-xs leading-normal flex flex-col md:flex-row justify-center font-medium text-custom_navyBlue">
                  <div className="w-full mb-4 md:mb-0">
                    <p className="flex items-center">
                      <NumbersIcon fontSize="inherit" className="mr-2" />
                      {booking.bookingNumber}
                    </p>
                    <p className="flex items-center">
                      <DetailsIcon fontSize="inherit" className="mr-2" />
                      {booking.description}
                    </p>
                    <p className="flex items-center">
                      <CurrencyRupeeIcon fontSize="inherit" className="mr-2" />
                      {booking.service.amount}
                    </p>
                  </div>
                  <div className="w-full flex">
                    <FaAddressBook className="mr-2 mt-1" />
                    <div>
                      <p>{booking.address.houseNumber}</p>
                      <p>{booking.address.street}</p>
                      <p>{booking.address.city}</p>
                      <p>{booking.address.pincode}</p>
                      <p>{booking.address.state}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {bookings.length > bookingsPerPage && (
        <div className="flex bottom-0 justify-center my-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      )}

      <div className="bg- h-1 flex-row flex"></div>
    </div>
  );
};

export default BookingsWorker;
