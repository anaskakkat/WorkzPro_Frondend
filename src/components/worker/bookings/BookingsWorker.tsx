import React, { useEffect, useState } from "react";
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
import { confirmBooking, getWorkerBooking } from "../../../api/worker";
import { Button, Popover } from "flowbite-react";
import MapIcon from "@mui/icons-material/Map";
import { useNavigate } from "react-router-dom";

const BookingsWorker = () => {
  const navigate = useNavigate();
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const workerId = useWorkerId();
  const bookingsPerPage = 3;
  const [bookings, setbBookings] = useState<Booking[]>([]);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getWorkerBooking(workerId);
      if (response) {
        setbBookings(response);
      }
    } catch (error) {
      // Handle error
    }
  };

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const toggleAccordion = (id: string) => {
    setOpenBookingId((prevId) => (prevId === id ? null : id));
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
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
        // console.log("response----", response);
        if (response.ststus === 200) {
          setSelectedBookingId(null);
          setIsPopoverVisible(false);
          fetchBookings();
        }
      } catch (error) {
        console.error("Error confirming booking", error);
      }
    }
  };

  const handlePopoverClose = () => {
    setSelectedBookingId(null);
    setIsPopoverVisible(false);
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
                  {booking.workerId.name}
                </div>
                <div className="flex items-center">
                  <MiscellaneousServicesIcon
                    fontSize="inherit"
                    className="mr-2"
                  />
                  {booking.workerId.service.name}
                </div>
                <div className="flex items-center max-w-48 ">
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
                    booking.status === "confirmed"
                      ? "text-green-900 bg-green-100 border border-green-400"
                      : booking.status === "pending"
                      ? "text-orange-800 bg-orange-100 border border-orange-400"
                      : booking.status === "completed"
                      ? "text-blue-800 bg-blue-100 border border-blue-400"
                      : booking.status === "canceled"
                      ? "text-red-800 bg-red-100 border border-red-400"
                      : ""
                  }`}
                >
                  {booking.status}
                </kbd>

                <Popover
                  open={isPopoverVisible && selectedBookingId === booking._id}
                  content={
                    <div className="w-64 text-sm">
                      <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          Are you Sure?
                        </h3>
                      </div>
                      <div className="px-3 py-2">
                        <p className="text-gray-500 dark:text-gray-400">
                          Confirm this Booking...
                        </p>
                        <div className="mt-4 flex justify-end space-x-3">
                          <Button onClick={handlePopoverClose}>No</Button>
                          <Button onClick={handleConfirm}>Yes</Button>
                        </div>
                      </div>
                    </div>
                  }
                  placement="bottom"
                  trigger="click"
                >
                  {booking.status === "pending" ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBookingId(booking._id!);
                        setIsPopoverVisible(true);
                      }}
                      className="capitalize text-blue-600 hover:text-white border hover:bg-blue-500 border-blue-600 rounded-lg self-start md:self-center w-full text-center py-1"
                    >
                      Accept
                    </button>
                  ) : (
                    <></>
                  )}
                </Popover>

                <button
                  type="button"
                  className="w-full gap-2 bg-white justify-center border-green-700 border text-green-700 hover:bg-green-800 hover:text-white  font-medium rounded-lg text-sm px-2 py-1 text-center inline-flex items-center me-2"
                  onClick={() => navigate('/worker/direction',{
                    state:booking.address.location.coordinates})}
                >
                  <span className="text-green-900 hover:text-white">
                    {" "}
                    <MapIcon fontSize="inherit" />
                  </span>
                  Map
                </button>
              </div>
            </div>

            <div className="">
              <button
                onClick={() => toggleAccordion(booking._id!)}
                className="items-center w-full font-semibold text-left transition-all ease-in cursor-pointer rounded-t-1 group text-black"
              >
                <span className="text-sm text-custom_buttonColor flex items-center px-4">
                  More Info
                  {openBookingId === booking._id ? (
                    <ArrowCircleUpSharp fontSize="inherit" className="ml-1" />
                  ) : (
                    <ArrowCircleDownSharp fontSize="inherit" className="ml-1" />
                  )}
                </span>
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
      {currentBookings.length > 2 ? (
        <div className="flex bottom-0 justify-center my-4">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </div>
      ) : (
        ""
      )}
      <div className="bg- h-1 flex-row flex"></div>
    </div>
  );
};

export default BookingsWorker;
