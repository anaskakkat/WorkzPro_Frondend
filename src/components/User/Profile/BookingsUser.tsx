import { useEffect, useState } from "react";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import Person4Icon from "@mui/icons-material/Person4";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FaAddressBook } from "react-icons/fa";
import { useUserId } from "../../../redux/hooks/userSelectors";
import { getBookingsUser, makePayment } from "../../../api/user";
import { Booking } from "../../../types/Booking";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DetailsIcon from "@mui/icons-material/Details";
import NumbersIcon from "@mui/icons-material/Numbers";
import { ArrowCircleDownSharp, ArrowCircleUpSharp } from "@mui/icons-material";
import moment from "moment";
import { Pagination } from "@mui/material";
import Loader from "../../loader/Loader";
import { useNavigate } from "react-router-dom";
import PaymentIcon from "@mui/icons-material/Payment";
import { loadStripe } from "@stripe/stripe-js";
import ChatIcon from "@mui/icons-material/Chat";
import { STRIPE_PUBLISHABLE_KEY } from "../../../constants/constant_env";
const BookingsUser = () => {
  const navigate = useNavigate();
  const userId = useUserId();
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const bookingsPerPage = 3;

  const toggleAccordion = (id: string) => {
    setOpenBookingId((prevId) => (prevId === id ? null : id));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    updateDisplayedBookings();
  }, [page, allBookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookingsUser(userId);
      if (response.status === 200) {
        setAllBookings(response.data.booking);
        setTotalPages(
          Math.ceil(response.data.booking.length / bookingsPerPage)
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateDisplayedBookings = () => {
    const startIndex = (page - 1) * bookingsPerPage;
    const endIndex = startIndex + bookingsPerPage;
    setBookings(allBookings.slice(startIndex, endIndex));
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    setOpenBookingId(null);
  };

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  const handlePayNow = async (bookingId: string) => {
    console.log(`Initiating payment for booking ${bookingId}`);
    try {
      const response = await makePayment(bookingId);
      console.log("Payment response:", response);
      let URL = response.url;
      const stripe = await stripePromise;
      if (stripe) {
        window.location.href = URL;
      }
      await fetchBookings();
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="mx-4 md:mx-8 lg:mx-20 overflow-hidden ">
      <div className="container mt-2 text font-semibold text-custom_navyBlue">
        My Bookings
      </div>
      <hr className="my-2" />
      {/* {loading ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : ( */}
      <div className="flex flex-col gap-4 font-normal text-sm  ">
        {bookings &&
          bookings.map((booking) => (
            <div
              key={booking._id}
              className="container border-y shadow-lg bg-white rounded-2xl px-4 md:px-8 py-3 border-blue-400 text-custom_navyBlue"
            >
              <div className="flex flex-col md:flex-row justify-between mx-2 md:mx-4 gap-4 ">
                <div className="flex flex-col gap-1 capitalize text-sm font-medium  min-w-56">
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
                  <div className="flex items-center max-w-48">
                    <AssignmentIcon fontSize="inherit" className="mr-2" />
                    <span className="truncate">{booking.service.service}</span>
                  </div>
                  <div className="flex text-xs   items-center max-w-48 ">
                    <PaymentIcon fontSize="inherit" className="mr-2" />
                    <span className="truncate text-yellow-700">
                      {booking?.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 font-medium">
                  <kbd className="px-4 md:px-8 py-1 text-gray-800 bg-gray-100 border border-gray-200 rounded-lg flex items-center">
                    <CalendarMonthIcon fontSize="inherit" className="mr-2" />
                    {moment(booking.bookingDate).format("MMMM Do YYYY")}
                  </kbd>
                  <div className="px-4 md:px-8 py-1   text-gray-800 bg-gray-100 border border-gray-200 rounded-lg flex items-center">
                    <CalendarMonthIcon fontSize="inherit" className="mr-2" />
                    {booking.slots}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <kbd className="px-3 h-fit py-1 text-xs font-medium text-black bg-orange-200 border border-orange-600 rounded-lg self-start md:self-center">
                    {booking.status}
                  </kbd>
                  <button
                    className="text-xs flex justify-center gap-2 capitalize text-white  border bg-blue-400 hover:bg-white hover:border-blue-700 hover:text-black border-blue-600-600 rounded-lg self-start md:self-center w-full text-center py-1"
                    onClick={() =>
                      navigate("/chats", {
                        state: { workerId: booking.workerId },
                      })
                    }
                  >
                    <span>
                      <ChatIcon fontSize="inherit" />{" "}
                    </span>
                    Chat
                  </button>
                  {booking.status === "completed" && (
                    <button
                      onClick={() => handlePayNow(booking._id!)}
                      className="text-xs capitalize text-white  border bg-black hover:bg-white hover:border-blue-700 hover:text-black border-blue-600-600 rounded-lg self-start md:self-center w-full text-center py-1"
                    >
                      <span className="text-blue-500 ">
                        <PaymentIcon fontSize="small" />{" "}
                      </span>{" "}
                      Pay Now
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => toggleAccordion(booking._id!)}
                  className="items-center w-full px-4 font-semibold text-left transition-all ease-in  cursor-pointer rounded-t-1 group text-black"
                >
                  <span className="text-sm text-custom_buttonColor flex items-center">
                    More Info
                    {openBookingId === booking._id ? (
                      <ArrowCircleUpSharp fontSize="inherit" className="ml-1" />
                    ) : (
                      <ArrowCircleDownSharp
                        fontSize="inherit"
                        className="ml-1"
                      />
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
                        <CurrencyRupeeIcon
                          fontSize="inherit"
                          className="mr-2"
                        />
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
      {/* )} */}
      <div className="flex justify-center my-3">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default BookingsUser;
