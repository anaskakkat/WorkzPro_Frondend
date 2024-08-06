import React from "react";
const Dashboard: React.FC = () => {
  // Sample data
  const totalBookings = 120;
  const averageRating = 4.5;
  const pendingBookings = 15;
  const workCompleted = 105;

  return (
    <div className="container mx-auto p-4">
 
        <>
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
            {/* Replace with actual reviews component */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-lg font-semibold mb-4">Pending Bookings</h2>
            {/* Replace with actual pending bookings component */}
          </div>
        </>
    </div>
  );
};

export default Dashboard;
