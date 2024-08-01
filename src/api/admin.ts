import Api from "../config/axiosConfig";
import { handleApiError } from "../config/HandleApiErrors";
import adminRoutes from "../endpoints/adminEndpoints";

interface LoginResponse {
  status: number;
  admin?: {
    email: string;
    name: string;
  };
  message: string;
}

export const verifyloginAdmin = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await Api.post<LoginResponse>(adminRoutes.login, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);

    // Return a default error response that matches the LoginResponse type
    return {
      status: 500,
      message: "An error occurred during login",
    };
  }
};

export const logoutAdmin = async () => {
  try {
    const response = await Api.post(adminRoutes.logoutAdmin);

    return response;
  } catch (error) {
    handleApiError(error);
  }
};
export const getUsers = async () => {
  try {
    const response = await Api.post(adminRoutes.getUser);

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const blockUser = async (userId: number) => {
  try {
    const response = await Api.patch(adminRoutes.blockUser(userId));

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const unblockUser = async (userId: number) => {
  try {
    const response = await Api.patch(adminRoutes.unblockUser(userId));

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const createServices = async (name: string, description: string) => {
  try {
    const response = await Api.post(adminRoutes.createServices, {
      name,
      description,
    });

    return response
  } catch (error) {
    console.log('catch');
    
    handleApiError(error);
    return 
  }
};
