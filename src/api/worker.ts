import Api from "../config/axiosConfig";
import workerRoutes from "../endpoints/workerEndpoints";
import { handleApiError } from "../config/HandleApiErrors";
import ISlot from "../types/ISlot";
import { IWorkerRegistration } from "../types/IWorker";
import { IGoogleUser } from "../types/user";

export const registerWorker = async (worker: IWorkerRegistration) => {
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
export const setSlot = async (slot: ISlot, id: string) => {
  try {
    const response = await Api.post(workerRoutes.setSlots(id), slot);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const fetchSlots = async (id: string) => {
  try {
    const response = await Api.get(workerRoutes.fetchSlots(id));
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const fetchCommonProblams = async (id: string) => {
  try {
    const response = await Api.get(workerRoutes.fetchCommonProblams(id));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const fetchWorker = async (workerid: string) => {
  try {
    const response = await Api.get(workerRoutes.fetchWorkerById(workerid));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const deleteSlot = async (id: string) => {
  try {
    const response = await Api.delete(workerRoutes.deleteSlot(id));
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const bookingAccept = async (id: string) => {
  try {
    const response = await Api.patch(workerRoutes.bookingAccept(id));
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const workerGoogleLogin = async (googleUser: IGoogleUser) => {
  try {
    const response = await Api.post(workerRoutes.googleLogin, googleUser);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const addProblem = async (data: {
  problemName: string;
  estimatedHours: string;
  workerId: string;
}) => {
  try {
    const response = await Api.post(workerRoutes.addProblem, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
