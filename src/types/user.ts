export interface IUser {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: number;
  password: string;
  wallet: number;
  role: string;
  profilePicture: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  status: string;
  name: string;
}

export interface IGoogleUser {
  sub?: any;
  email: string;
  name: string;
  picture: string;
  googleId: string;
}
