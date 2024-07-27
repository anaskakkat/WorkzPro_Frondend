import Api from "../config/axiosConfig";
import { AxiosError, AxiosResponse } from "axios";
import userRoutes from "../endpoints/userEndpoints";
interface FormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}
interface Resp {
  data: string;
  user?: {
    userName: string;
    email: string;
    phoneNumber: number;
    password: string;
    wallet: number;
    isBlocked: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  message: string;
}
export const signUp = async (user: FormData) => {
  try {
    // console.log("user:",user);

    const response = await Api.post(userRoutes.signUp, user);

    // console.log("signUp touched response", response);
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return error.response;
      } else {
        console.error("Error", error.message);
      }
    } else {
      console.error("An unexpected error occurred", error);
    }
    throw error;
  }
};

export const verifyotp = async (
  email: string,
  otp: string | number
): Promise<AxiosResponse<Resp>> => {
  try {
    const response: AxiosResponse<Resp> = await Api.post(userRoutes.verifyOtp, {
      email,
      otp,
    });
    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return error.response as AxiosResponse<Resp>;
      } else {
        console.error("Error", error.message);
      }
    } else {
      console.error("An unexpected error occurred", error);
    }
    throw error;
  }
};
export const resendOtp = async (email: string) => {
  try {
    const response = await Api.post(userRoutes.resendOtp, { email });
    console.log("response:", response);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        return error.response;
      } else {
        console.error("Error", error.message);
      }
    } else {
      console.error("An unexpected error occurred", error);
    }
    throw error;
  }
};
export const verfylogin = async (email: string, password: string) => {
  try {
    const response = await Api.post(userRoutes.loginVerify, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const logoutUser = async () => {
  try {
    const response = await Api.post(userRoutes.logoutUser);
    
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
