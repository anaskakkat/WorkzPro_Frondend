import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeUserInfo } from "../../redux/slices/userSlices";
import Api from "../../config/axiosConfig";
import { removeWorkerInfo } from "@/redux/slices/workerSlice";

interface InterceptorSetupProps {
  children: ReactNode;
}

const InterceptorSetup: React.FC<InterceptorSetupProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("Setting up interceptor");
    const interceptor = Api.interceptors.response.use(
      (response) => {
        console.log("Interceptor: Successful response", response.status);
        return response;
      },
      (error: any) => {
        console.log("Interceptor: Error caught", error);

        if (error.response) {
          console.log("Interceptor: Error status", error.response.status);
          console.log("Interceptor: Error data", error.response.data);
          if (
            error.response.status === 401 &&
            error.response.data === "user are blocked by admin"
          ) {
            console.log("Interceptor: Error user blocked");
            dispatch(removeUserInfo());
          } else if (
            error.response.status === 401 &&
            error.response.data === "worker are blocked by admin"
          ) {
            console.log("Interceptor: Error worker blocked");
            dispatch(removeWorkerInfo())
          } else {
            // console.error("Interceptor: Unhandled error:", error.response);
          }
        } else if (error.request) {
          console.error("Interceptor: No response received:", error.request);
        } else {
          console.error(
            "Interceptor: Error during request setup:",
            error.message
          );
        }

        return Promise.reject(error);
      }
    );
    // console.log("Interceptor set up complete");

    return () => {
      Api.interceptors.response.eject(interceptor);
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default InterceptorSetup;
