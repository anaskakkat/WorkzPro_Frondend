import IWorker from "./IWorker";
import { IUser } from "./user";

export interface IBooking {
  _id: string;
  image: string;
  status: string;
  date: string;
  workerId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  selectedSlot: string;
  location: string;
  comments?: string;
}

export interface Booking {
  _id?: string;
  userId: IUser;
  workerId: IWorker;
  status: string;
  bookingNumber: string | number;
  description: string;
  bookingDate: string;
  slots: string;
  review?: {
    _id: string;
    comment: string;
    rating:number
  };
  service: {
    _id?: string;
    service: string;
    amount: number;
    slot: number;
  };
  paymentStatus: "pending" | "success";
  address: {
    houseNumber: string;
    street: string;
    city: string;
    state: string;
    pincode: number;
    location: {
      coordinates: [number, number];
      type: "Point";
    };

    createdAt?: Date;
    updatedAt?: Date;
  };
}
