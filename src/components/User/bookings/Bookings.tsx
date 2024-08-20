import { useEffect, useState } from "react";
import { Booking } from "../../../types/Booking";
import { fetchBookingUser } from "../../../api/user";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import Loader from "../../loader/Loader";

const Bookings = () => {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const userId = useSelector((state: RootState) => state.userInfo.userInfo._id);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBooking();
  }, [userId]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await fetchBookingUser(userId);

      setBookingsData(response.data);
      // console.log("Bookings data:", response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
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
  if (loading) {
    return <Loader />;
  }
  return (
    <div className=" overflow-x-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Booking History</h2>
      <div className="shadow overflow-hidden whitespace-nowrap border-gray-200 sm:rounded-lg">
        <table className="min-w-full">
          <thead className="bg-blue-50">
            <tr className="px-6 py-3 text-left text-xs font-medium text-blue-900 uppercase tracking-wider">
              <th className="py-2 px-4 "></th>
              <th className="py-2 px-4 ">ID</th>
              <th className="py-2 px-4 ">Name</th>
              <th className="py-2 px-4 ">Date</th>
              <th className="py-2 px-4 ">Slot</th>
              <th className="py-2 px-4 ">Status</th>

              <th className="py-2 px-4 border-b"></th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {bookingsData.map((booking) => (
              <tr key={booking._id} className="hover:bg-blue-100 text-gray-800">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                  <img
                    src={booking.workerId.profilePicture}
                    alt={booking.workerId.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  #{booking.workerId.workerId}
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  {booking.workerId.name}
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  {booking.selectedSlot.time}
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  {booking.status}
                </td>
                <td className="py-2 px-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDetails(booking._id)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700"
                  >
                    Details
                  </button>
                </td>
                <td className=" px-4 whitespace-nowrap">
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
