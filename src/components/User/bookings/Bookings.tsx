import BookingForm from "../workerAvailblity/BookingForm";
import WorkerAvailability from "../workerAvailblity/WorkerAvaliblity";

const Bookings = () => {
  return (
    <div className="flex gap-10 p-6 col-2">
      <WorkerAvailability />
      <BookingForm />
    </div>
  );
};

export default Bookings;
