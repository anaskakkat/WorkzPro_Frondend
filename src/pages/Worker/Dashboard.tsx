import React from 'react';

const Dashboard: React.FC = () => {
  // Sample data
  const totalBookings = 120;
  const averageRating = 4.5;
  const pendingBookings = 15;
  const workCompleted = 105;
  // const latestReviews = [
  //   { id: 1, user: 'John Doe', review: 'Great service!', rating: 5 },
  //   { id: 2, user: 'Jane Smith', review: 'Very satisfied.', rating: 4 },
  //   { id: 3, user: 'Michael Brown', review: 'Good work!', rating: 4 },
  //   { id: 4, user: 'Emily White', review: 'Excellent!', rating: 5 },
  //   { id: 5, user: 'David Johnson', review: 'Not bad.', rating: 3 },
  // ];
  // const pendingBookingsList = [
  //   { id: 1, user: 'Alice Walker', service: 'Plumbing', date: '2024-08-01' },
  //   { id: 2, user: 'Bob Thompson', service: 'Electrical', date: '2024-08-02' },
  //   { id: 3, user: 'Carol Wilson', service: 'Carpentry', date: '2024-08-03' },
  //   // Add more pending bookings as needed
  // ];

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
    </div>
  );
};

export default Dashboard;
