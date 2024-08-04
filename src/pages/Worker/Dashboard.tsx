import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";


const Dashboard: React.FC = () => {
  const user= useSelector((state:any) => state.workerInfo);

  // Sample data
  const totalBookings = 120;
  const averageRating = 4.5;
  const pendingBookings = 15;
  const workCompleted = 105;
  // const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    // Open the modal if the profile is not verified
    if (!user.isProfileVerified) {
      setIsModalOpen(true);
    }
  }, []);


  


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Bookings</h2>
          <p className="text-3xl font-bold">{totalBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Average Rating</h2>
          <p className="text-3xl font-bold">{averageRating.toFixed(1)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Pending Bookings</h2>
          <p className="text-3xl font-bold">{pendingBookings}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Work Completed</h2>
          <p className="text-3xl font-bold">{workCompleted}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Chart</h2>
        {/* Replace with actual chart component */}
        <div className="h-64 bg-gray-100 rounded-lg">Chart goes here</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Latest Reviews</h2>
        {/* <ul>
          {latestReviews.map(review => (
            <li key={review.id} className="mb-4">
              <p className="font-semibold">{review.user}</p>
              <p>{review.review}</p>
              <p>Rating: {review.rating}</p>
            </li>
          ))}
        </ul> */}
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Pending Bookings</h2>
        {/* <ul>
          {pendingBookingsList.map(booking => (
            <li key={booking.id} className="mb-4">
              <p className="font-semibold">{booking.user}</p>
              <p>Service: {booking.service}</p>
              <p>Date: {booking.date}</p>
            </li>
          ))}
        </ul> */}
      </div>

      {/* Modal for profile verification */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-custom_navyBlue bg-o z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-80">
            <h2 className="text-xl font-semibold mb-4">
              Admin Verification Pending
            </h2>
            <p className="mb-4">Please wait.. to access all features.</p>
            {/* <button
              onClick={handleSetupProfile}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Setup Profile
            </button> */}
          </div>
        </div>
      )}

    
    </div>
  );
};

export default Dashboard;
