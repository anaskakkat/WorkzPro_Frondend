import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { setServices } from "../../../redux/slices/ServiceSlice";
import Loader from "../../Loader/Loader.tsx";
import { userServices } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import IService from "../../../types/IService";

const Service: React.FC = () => {
  const dispatch = useDispatch();
  const services = useSelector((state: RootState) => state.services.services);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await userServices();
      if (response) {
        const filteredServices = response.filter(
          (service: IService) => service.isBlocked === false
        );
        dispatch(setServices(filteredServices));
      }
    } catch (error) {
      console.error("There was an error fetching the services!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleServiceClick = (serviceId: string) => {
    navigate(`/workersNearby?service=${encodeURIComponent(serviceId)}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col mb-10 lg:flex-row h-full  lg:h-[calc(100vh-4rem)] items-center px-8">
      {/* Services Header */}
      <div className="w-full sm:gap-1  justify-center text-center text-xl sm:text-4xl my-4  lg:text-left lg:w-96   flex flex-col sm:flex-row  lg:flex-col">
        <span className="font-semibold lg:w-44  lg:text-6xl font-oswald block">
          LEARN MORE ABOUT OUR
        </span>
        <span className="text-custom_buttonColor text-center  font-oswald lg:w-44 lg:text-6xl font-semibold block">
          SERVICES
        </span>
      </div>

      {/* Services Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {services.map((service) => (
          <ServiceCard
            key={service._id}
            service={service}
            handleClick={handleServiceClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Service;
