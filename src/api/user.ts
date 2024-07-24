import Api from "../config/axiosConfig";

import userRoutes from "../endpoints/userEndpoints";
interface FormData{
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;

}

export const signUp = async (user:FormData) => {
    try {
      console.log("user:",user);
      
      
      const response = await Api.post(userRoutes.signUp,user);
      
      console.log('signUp touched response',response);
      return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
      if (error.response) {
        return error.response;
      } else {
        console.error("Error", error.message);
      }
      throw error;
    }
  };