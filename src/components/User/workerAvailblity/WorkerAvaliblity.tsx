import { useState } from "react";

const WorkerAvailability = () => {
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    selectedSlot: "",
  });

  const workerDetails = {
    name: "John Doe",
    expertise: "Plumbing",
    rating: 4.8,
  };

  const serviceDetails = {
    name: "Pipe Repair",
    duration: "2 hours",
    price: "$100",
  };

  const availableSlots = [
    "9:00 AM - 11:00 AM",
    "1:00 PM - 3:00 PM",
    "4:00 PM - 6:00 PM",
  ];

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setBookingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Booking submitted:", bookingInfo);
    // Here you would typically send the booking information to your backend
  };

  return (
    <div className="worker-availability">
      <h1>Worker Availability and Booking</h1>

      <section className="worker-details">
        <h2>Worker Details</h2>
        <p>Name: {workerDetails.name}</p>
        <p>Expertise: {workerDetails.expertise}</p>
        <p>Rating: {workerDetails.rating}/5</p>
      </section>

      <section className="service-details">
        <h2>Service Details</h2>
        <p>Service: {serviceDetails.name}</p>
        <p>Duration: {serviceDetails.duration}</p>
        <p>Price: {serviceDetails.price}</p>
      </section>

      <section className="booking-form">
        <h2>Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={bookingInfo.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={bookingInfo.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              value={bookingInfo.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="selectedSlot">Select a Time Slot:</label>
            <select
              id="selectedSlot"
              name="selectedSlot"
              value={bookingInfo.selectedSlot}
              onChange={handleInputChange}
              required
            >
              <option value="">Choose a slot</option>
              {availableSlots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Book Appointment</button>
        </form>
      </section>
    </div>
  );
};

export default WorkerAvailability;