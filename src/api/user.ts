import Api from "../config/axiosConfig";
import axios, { AxiosResponse } from "axios";
import userRoutes from "../endpoints/userEndpoints";
import { handleApiError } from "../config/HandleApiErrors";
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
    console.log("userServices:--", response);
    return response.data
  } catch (error) {
    handleApiError(error);
  }
  
};
export const verifyGoogleToken = async (token: string) => {
  try {
    const response = await axios.post('/api/auth/google', { token });
    return response;
  } catch (error) {
    throw error;
  }
};