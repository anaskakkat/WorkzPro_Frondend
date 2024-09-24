import BookingForm from "../workerAvailblity/BookingForm";
import WorkerAvailability from "../workerAvailblity/WorkerAvaliblity";

const Bookings = () => {
  return (
    <div className="flex flex-col w-auto col-2 gap-5 lg:flex-row ">
      <WorkerAvailability />
      <BookingForm />
    </div>
  );
};

export default Bookings;
