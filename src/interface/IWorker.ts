interface IWorker {
  _id: string;
  workerId: number;
  name: string;
  email: string;
  phoneNumber: string | number;
  password: string;
  service: string;
  slots: string[];
  experience: number;
  location: string;
  role: "worker";
  identityProof: string;
  wallet: number;
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
