import IService from "./IService";

interface IWorker {
  locationName: string;
  _id: string;
  workerId: number;
  name: string;
  email: string;
  phoneNumber: string | number;
  password: string;
  service: IService;
  slots: string[];
  experience: number;
  role: "worker";
  identityProof: string;
  wallet: number;
  wageDay: number;
  serviceCost: number;
  profilePicture: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  images: string[];
  isProfileSetup: boolean;
  loginAccess: boolean;
  rating: number;
  distance?: number;
  configuration?: ConfigurationType;
  location: {
    coordinates: [number, number];
    type: "Point";
  };
}

export default IWorker;

export interface IWorkerRegistration {
  name: string;
  email: string;
  password: string;
  phoneNumber: string | number;
}
export type ConfigurationType = {
  workingDays: WorkingDayType[];
  slotSize: number;
  bufferTime: number;
  services: ServiceType[];
  leaves: LeaveType[];
};
export type WorkingDayType = {
  _id: string;
  start: string;
  end: string;
  isWorking: boolean;
};

export type ServiceType = {
  _id: string;
  description: string;
  amount: number;
  slots: number;
};

export type LeaveType = {
  _id?: string;
  date: string;
  reason: string;
};

export type LocationType = {
  latitude: number;
  longitude: number;
};

export type ServiceData = {
  _id?: string;
  service: string;
  slot: number;
  amount: number;
};
export type IserviceData = {
  serviceId: string;
  workerId: string;
};
