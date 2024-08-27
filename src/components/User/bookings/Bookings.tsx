import BookingForm from "../workerAvailblity/BookingForm";
import WorkerAvailability from "../workerAvailblity/WorkerAvaliblity";

const Bookings = () => {
  return (
    <div className="flex gap-">
      <WorkerAvailability />
      <BookingForm />
    </div>
  );
};

export default Bookings;
