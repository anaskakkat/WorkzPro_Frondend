import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { setServices } from "../../../redux/slices/ServiceSlice";
import Loader from "../../Loader/Loader.tsx";
import { userServices } from "../../../api/user";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import IService from "../../../types/IService";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection.tsx";

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
    <div className="flex flex-col lg:gap-16 mb-10 lg:flex-row h-full  lg:h-[calc(100vh-4rem)] items-center px-8">
      {/* Services Header */}
      <motion.div
        className="w-full lg:w-auto gap-2 sm:gap-1  justify-center text-center text-xl sm:text-4xl my-4  lg:text-left  flex flex-col sm:flex-row  lg:flex-col"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="font-semibold lg:w-56  lg:text-6xl font-oswald block">
          LEARN MORE ABOUT OUR
        </span>
        <span className="bg-custom-gradient-blue bg-clip-text text-transparent   font-oswald  lg:text-6xl font-semibold block">
          SERVICES
        </span>
      </motion.div>

      {/* Services Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {services.map((service, index) => (
          <AnimatedSection
            key={index}
            direction="up"
            delay={index * 0.2}
            duration={0.5}
          >
            <ServiceCard service={service} handleClick={handleServiceClick} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
};

export default Service;
