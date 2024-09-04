import Api from "../config/axiosConfig";
import workerRoutes from "../endpoints/workerEndpoints";
import { handleApiError } from "../config/HandleApiErrors";
import ISlot from "../types/ISlot";
import { IWorkerRegistration, LeaveType, ServiceData } from "../types/IWorker";
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
    // console.log("verfyloginWorker:--", response);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const getWorkerServices = async () => {
  try {
    const response = await Api.get(workerRoutes.getServicesData);
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
export const editConfigration = async (workerId: string, data: any) => {
  try {
    const response = await Api.patch(
      workerRoutes.editConfigration(workerId),
      data
    );
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
export const saveService = async (workerId: string, data: ServiceData) => {
  try {
    const response = await Api.post(
      workerRoutes.createServices(workerId),
      data
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const fecthServices = async (workerId: string) => {
  try {
    const response = await Api.get(workerRoutes.fecthServices(workerId));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const deleteService = async (workerId: string, serviceId: string) => {
  try {
    const response = await Api.patch(workerRoutes.deleteService(workerId), {
      serviceId,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const editService = async (
  workerId: string,
  data: ServiceData,
  serviceId: string
) => {
  try {
    const response = await Api.patch(workerRoutes.editService(workerId), {
      serviceId,
      data,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const addLeaves = async (workerId: string, newEntry: LeaveType) => {
  try {
    const response = await Api.post(workerRoutes.addLeaves(workerId), newEntry);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const getLeaves = async (workerId: string) => {
  try {
    const response = await Api.get(workerRoutes.getLeaves(workerId));
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const deleteLeves = async (workerId: string, leaveId: string) => {
  try {
    const response = await Api.patch(workerRoutes.deleteLeves(workerId), {
      leaveId,
    });
    return response.data.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const getWorkerBooking = async (workerId: string) => {
  try {
    const response = await Api.get(
      workerRoutes.fetchBookingsWorkerId(workerId)
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const confirmBooking = async (workerId: string) => {
  try {
    const response = await Api.patch(
      workerRoutes.fetchBookingsWorkerId(workerId)
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const rejectBooking = async (workerId: string) => {
  try {
    const response = await Api.patch(
      workerRoutes.rejectBookingRequest(workerId)
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const updateWorkerProfile = async (
  workerId: string,
  formDAta: FormData
) => {
  try {
    const response = await Api.patch(
      workerRoutes.updateWorkerProfile(workerId),
      formDAta
    );
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
