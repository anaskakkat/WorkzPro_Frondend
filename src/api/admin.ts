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

    return response;
  } catch (error) {
    handleApiError(error);
    return;
  }
};
export const getServices = async () => {
  try {
    const response = await Api.post(adminRoutes.getServices);

    if (response) {
      return response.data.service;
    }
  } catch (error) {
    handleApiError(error);
    return;
  }
};
export const updateService = async (id: string, name: string, desc: string) => {
  try {
    const response = await Api.put(adminRoutes.updateService(id), {
      name,
      description: desc,
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
    return;
  }
};
export const blockService = async (serviceId: string, isBlocked: boolean) => {
  try {
    const endpoint = isBlocked
      ? adminRoutes.unblockService(serviceId)
      : adminRoutes.blockService(serviceId);

    const response = await Api.patch(endpoint);
    if (response && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error in blockService:", error);
    handleApiError(error);
    return;
  }
};

export const getWorkers = async () => {
  try {
    const response = await Api.get(adminRoutes.getWorkers);

    if (response) {
      return response.data.workers;
    }
  } catch (error) {
    handleApiError(error);
    return;
  }
};

export const blockWorker = async (userId: string) => {
  try {
    const response = await Api.patch(adminRoutes.blockWorker(userId));

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const unblockWorker = async (userId: string) => {
  try {
    const response = await Api.patch(adminRoutes.unblockWorker(userId));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const getRequests = async () => {
  try {
    const response = await Api.get(adminRoutes.getWorkers);
    // console.log("admin-getRequests--",getRequests);

    return response.data.workers;
  } catch (error) {
    handleApiError(error);
  }
};
export const acceptRequest = async (id: string) => {
  try {
    const response = await Api.patch(adminRoutes.worker_request(id));
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
export const rejectRequest = async (workerId: string, reason: string) => {
  try {
    const response = await Api.patch(adminRoutes.requestReject(workerId), {
      reason,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
//dashbord---------------------------------------------------
export const fetchDashbordData = async () => {
  try {
    const response = await Api.get(adminRoutes.fetchDashboard);
    return response.data;
  } catch (error) {
    throw error;
  }
};
