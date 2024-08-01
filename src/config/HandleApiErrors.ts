import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.log("Error response:", error.response);
      
      let errorMessage = "An error occurred";
      
      switch (error.response.status) {
        case 400:
          errorMessage = error.response.data || "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please login again.";
          break;
        case 403:
          errorMessage = "Forbidden. You don't have permission to access this resource.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 500:
          errorMessage = "Internal server error. Please try again later.";
          break;
        default:
          errorMessage = `An error occurred: ${error.response.status}`;
      }
      
      toast.error(errorMessage);
      
      return error.response.data;
    }
  }
  
  // If it's not an AxiosError or doesn't have a response
  toast.error("An unexpected error occurred");
  return null;
};