import BookingForm from "../workerAvailblity/BookingForm";
import WorkerAvailability from "../workerAvailblity/WorkerAvaliblity";

const Bookings = () => {
  return (
    <div className="flex flex-col  p-6 col-2 w-full md:flex-row">
      <WorkerAvailability />
      <BookingForm />
    </div>
  );
};

export default Bookings;
