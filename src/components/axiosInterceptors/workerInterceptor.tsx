import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Api from "../../config/axiosConfig";
import { removeWorkerInfo } from "../../redux/slices/workerSlice";

interface InterceptorSetupProps {
  children: ReactNode;
}

const WorkerInterceptor: React.FC<InterceptorSetupProps> = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = Api.interceptors.response.use(
      (response) => {
        // console.log('interceptor:-response--',response);

        return response;
      },
      (error: any) => {
        // console.log("interceptor:--- error", error);

        if (error.response.status === 401) {
          dispatch(removeWorkerInfo());
        }
        return Promise.reject(error);
      }
    );

    return () => {
      Api.interceptors.response.eject(interceptor);
    };
  }, [dispatch, navigate]);

  return <>{children}</>;
};

export default WorkerInterceptor;
