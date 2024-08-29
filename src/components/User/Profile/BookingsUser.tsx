import { useEffect, useState } from "react";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import Person4Icon from "@mui/icons-material/Person4";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { FaAddressBook } from "react-icons/fa";
import { useUserId } from "../../../redux/hooks/userSelectors";
import { getBookingsUser } from "../../../api/user";
const BookingsUser = () => {
    const userId=useUserId()
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    fetchBookings();
  }, []);
  const fetchBookings = async () => {
    try {
      const response = await getBookingsUser(userId);
      console.log("resp---", response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mx-28">
      <div className="container mt-4 text-xl font-semibold text-custom_navyBlue">
        My Bookings
      </div>
      <hr className="my-5" />
      <div className="container border-y shadow-lg bg-red rounded-2xl px-8 py-3 border-blue-400  text-custom_navyBlue">
        <div className="flex justify-between mx-4">
          <div className="flex flex-col gap-1">
            <div>
              {" "}
              <Person4Icon />
              &nbsp;&nbsp;&nbsp;name
            </div>
            <div>
              <MiscellaneousServicesIcon />
              &nbsp;&nbsp;&nbsp;Painter
            </div>
            <div>
              <AssignmentIcon />
              &nbsp;&nbsp;&nbsp;painter room
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <kbd className="px-8 py-3 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              <CalendarMonthIcon fontSize="small" />
              &nbsp;&nbsp; Spacebar
            </kbd>
            <div className=" px-8 py-3 text-xs font-medium text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
              <CalendarMonthIcon fontSize="small" />
              &nbsp;&nbsp;&nbsp; Spacebar
            </div>
          </div>
          <kbd className="px-6 h-fit py-2 text-xs font-semibold text-blue-800 bg-orange-300 border border-gray-200 rounded-lg">
            Pending
          </kbd>
        </div>

        <div className="">
          <button
            onClick={toggleAccordion}
            className=" flex items-center w-full px-4 font-semibold text-left transition-all ease-in border-b border-solid cursor-pointer  rounded-t-1 group text-black"
          >
            <span className="bg-blue-400 px-2.5 py-2 mb-2 rounded-2xl text-white text-sm">
              More Info
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="p-4 text-sm leading-normal flex-row flex justify-center font-medium text-custom_navyBlue ">
              <div className=" w-full">
                <p>#8333</p>
                <p>dsc</p>
                <p>&#8377; amount</p>
              </div>
              <div className="w-full flex">
                <FaAddressBook className="mr-2" />
                <div>
                  <p>asdasd</p>
                  <p>asdasd</p>
                  <p>asdasd</p>
                  <p>asdasd</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsUser;
