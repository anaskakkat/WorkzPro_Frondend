import { useEffect, useState } from "react";
import { Booking } from "../../../interface/Booking";
import { fetchBookingUser } from "../../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";

const Bookings = () => {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const userId = useSelector((state: RootState) => state.userInfo.userInfo._id);

  useEffect(() => {
    fetchBooking();
  }, [userId]);

  const fetchBooking = async () => {
    try {
      const response = await fetchBookingUser(userId);

      setBookingsData(response.data);
      // console.log("Bookings data:", response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  const handleDetails = (id: string) => {
    console.log(`Details for booking ID: ${id}`);
    // Implement details logic here
  };

  const handleCancel = (id: string) => {
    console.log(`Cancel booking ID: ${id}`);
    // Implement cancel logic here
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Booking History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100 rounded-lg  text-custom_navyBlue">
              <th className="py-2 px-4 font-medium border-b"></th>
              <th className="py-2 px-4 font-medium border-b">ID</th>
              <th className="py-2 px-4 font-medium border-b">Name</th>
              <th className="py-2 px-4 font-medium border-b">Date</th>
              <th className="py-2 px-4 font-medium border-b">Slot</th>
              <th className="py-2 px-4 font-medium border-b">Status</th>

              <th className="py-2 px-4 border-b"></th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {bookingsData.map((booking) => (
              <tr key={booking._id} className="hover:bg-custom_lightBlue text-gray-800">
                <td className="py-2 px-4 border-b">
                  <img
                    src={booking.workerId.profilePicture}
                    alt={booking.workerId.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">#{booking.workerId.workerId}</td>
                <td className="py-2 px-4 border-b">{booking.workerId.name}</td>
                {/* <td className="py-2 px-4 border-b">{booking.date}</td> */}
                <td className="py-2 px-4 border-b">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  {booking.selectedSlot.time}
                </td>
                <td className="py-2 px-4 border-b">{booking.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => handleDetails(booking._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    Details
                  </button>
                </td>
                <td className=" px-4 border-b">
                  <button
                    onClick={() => handleCancel(booking._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
