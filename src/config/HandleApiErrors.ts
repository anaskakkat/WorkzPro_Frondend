import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.log("Error response:", error.response.data);
      
      switch (error.response.status) {
        case 400:
          const errorMessage = error.response.data.message || "Bad request. Please check your input.";          
          toast.error(errorMessage);
          break;
        case 401:
          toast.error("Unauthorized. Please login again.");
          break;
        case 403:
          toast.error("Forbidden. You don't have permission to access this resource.");
          break;
        case 404:
          toast.error("Resource not found.");
          break;
        case 500:
          toast.error("Internal server error. Please try again later.");
          break;
        default:
          toast.error(`An error occurred: ${error.response.status}`);
      }

      return error.response.data;
    } else if (error.request) {
      console.error("No response received:", error.request);
      toast.error("No response received from server. Please try again.");
    } else {
      console.error("Error setting up request:", error.message);
      toast.error("An unexpected error occurred. Please try again.");
    }
  } else {
    console.error("An unexpected error occurred", error);
    toast.error("An unexpected error occurred. Please try again.");
  }

  throw error;
};