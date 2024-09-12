import Api from "../config/axiosConfig";
import axios, { AxiosResponse } from "axios";
import userRoutes from "../endpoints/userEndpoints";
import { handleApiError } from "../config/HandleApiErrors";
import { IGoogleUser } from "../types/user";
import { Message } from "../components/User/chat/MessageUi";
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}
interface UserResponse {
  userName: string;
  email: string;
  phoneNumber: number;
}
interface Resp {
  data: string;
  user?: UserResponse;
  message: string;
}

export const signUp = async (
  user: FormData
): Promise<AxiosResponse<any> | any> => {
  try {
    console.log("user:", user);

    const response = await Api.post(userRoutes.signUp, user);

    // console.log("signUp touched response", response);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const verifyotp = async (
  email: string,
  otp: string | number
): Promise<AxiosResponse<Resp> | any> => {
  try {
    const response: AxiosResponse<Resp> = await Api.post(userRoutes.verifyOtp, {
      email,
      otp,
    });
    // console.log("verify touched response", response);
    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const resendOtp = async (
  email: string
): Promise<AxiosResponse<Resp> | any> => {
  try {
    const response = await Api.post(userRoutes.resendOtp, { email });
    // console.log("response:", response);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const verfylogin = async (
  email: string,
  password: string
): Promise<AxiosResponse<UserResponse> | any> => {
  try {
    const response = await Api.post(userRoutes.loginVerify, {
      email,
      password,
    });
    // console.log("response-- frond", response);

    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const logoutUser = async () => {
  try {
    const response = await Api.post(userRoutes.logoutUser);

    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const userServices = async () => {
  try {
    const response = await Api.get(userRoutes.getService);
    // console.log("userServices:--", response);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const verifyGoogleToken = async (token: string) => {
  try {
    const response = await axios.post("/api/auth/google", { token });
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchWorkers = async (serviceId: string, locationData: any) => {
  try {
    const response = await Api.post(userRoutes.fetchWorkers, {
      serviceId,
      locationData,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchWorkerDatabyId = async (id: string) => {
  try {
    const response = await Api.get(userRoutes.fetchWorkerDatabyId(id));

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const googleAuth = async (user: IGoogleUser) => {
  try {
    const response = await Api.post(userRoutes.GoogleLogin, user);
    return response;
  } catch (error) {
    throw error;
  }
};
export const bookingData = async (userId: string, bookingData: any) => {
  try {
    const response = await Api.post(
      userRoutes.bookingData(userId),
      bookingData
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchBookings = async (userId: string) => {
  try {
    const response = await Api.get(userRoutes.fetchBookings(userId));
    return response;
  } catch (error) {
    throw error;
  }
};
export const getBookingsUser = async (userId: string) => {
  try {
    const response = await Api.get(userRoutes.fetchBookingsByUser(userId));
    return response;
  } catch (error) {
    throw error;
  }
};
export const fetchBookingsByDate = async (workerId: string, date: Date) => {
  try {
    const response = await Api.get(
      userRoutes.fetchBookingsByDate(workerId, date)
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const fetchChats = async (userId: string) => {
  try {
    const response = await Api.get(userRoutes.fetchChats(userId));
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createChat = async (
  name: string,
  userId: string,
  workerId: string
) => {
  try {
    const response = await Api.post(userRoutes.createChat, {
      recieverName: name,
      senderId: userId,
      recieverId: workerId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMessages = async (chatId: string) => {
  try {
    const response = await Api.get(userRoutes.fetchMessages(chatId));
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const sendMessage = async (message: Message) => {
  try {
    const response = await Api.post(userRoutes.sendMessage, message);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// make payment-------------------------------------------------------------------------------------------------
export const makePayment = async (bookingId: string) => {
  try {
    console.log("iddddddddddd---", bookingId);

    const response = await Api.post(userRoutes.makePayment(bookingId));
    return response.data;
  } catch (error) {
    throw error;
  }
};
