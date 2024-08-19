import ISlot from "./ISlot";
import IWorker from "./IWorker";

export interface IBooking {
  _id: string;
  image: string;
  status: string;
  date: string;
  workerId: string | IBooking;
  name: string;
  email: string;
  phone: string;
  address: string;
  selectedSlot: string;
  location: string;
  comments?: string;
}

export interface Booking {
  _id: string;
  image: string;
  status: string;
  date: string;
  workerId: IWorker;
  selectedSlot: ISlot;
  location: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  comments?: string;
}
