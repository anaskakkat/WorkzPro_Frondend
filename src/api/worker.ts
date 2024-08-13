import Api from "../config/axiosConfig";
import workerRoutes from "../endpoints/workerEndpoints";
import { handleApiError } from "../config/HandleApiErrors";
interface IWorker {
  name: string;
  email: string;
  phoneNumber: string | number;
  password: string;
}
export interface ISlot {
    date: string;
    time:"fullday" | "morning" | "afternoon"|string
}

export const registerWorker = async (worker: IWorker) => {
  try {
    // console.log("worker:", worker);
    const response = await Api.post(workerRoutes.signUp, worker);
    return response.data;
  } catch (error: unknown) {
    handleApiError(error);
  }
};
export const verifyWorkerOtp = async (email: string, otp: string | number) => {
  try {
    const response = await Api.post(workerRoutes.verifyOtp, {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const logoutWorker = async () => {
  try {
    const response = await Api.post(workerRoutes.logoutUser);

    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const verfyloginWorker = async (email: string, password: string) => {
  try {
    const response = await Api.post(workerRoutes.loginVerify, {
      email,
      password,
    });
    console.log("verfyloginWorker:--", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const workerServices = async () => {
  try {
    const response = await Api.get(workerRoutes.getService);
    // console.log("workerServices:--", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const setProfileData = async (profileData: FormData) => {
  try {
    const response = await Api.post(workerRoutes.setProfile, profileData);
    // console.log("workerServices:--", response.data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const setSlot = async (slot: ISlot,id:string) => {
  try {
    const response = await Api.post(workerRoutes.setSlots(id),slot);
    // console.log("workerServices:--", response.data);
    // return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const fetchSlots = async (id: string) => {
  try {
    const response = await Api.get(workerRoutes.fetchSlots(id));
    // console.log("fetchSlots:--", response.data.data);
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};

