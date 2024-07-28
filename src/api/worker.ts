import Api from "../config/axiosConfig";
import { AxiosError } from "axios";
import workerRoutes from "../endpoints/workerEndpoints";

interface IWorker {
  name: string;
  email: string;
  phoneNumber: string | number;
  password: string;
}

export const registerWorker = async (worker: IWorker) => {
  try {
    // console.log("worker:", worker);
    const response = await Api.post(workerRoutes.signUp, worker);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        return error.response.data;
      } else {
        console.error("Error message:", error.message);
      }
    } else {
      console.error("An unexpected error occurred", error);
    }
    throw error;
  }
};
