import IService from "./IService";

interface IWorker {
  _id: string;
  workerId: number;
  name: string;
  email: string;
  phoneNumber: string | number;
  password: string;
  service: IService;
  slots: string[];
  experience: number;
  location: string;
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
}

export default IWorker;
