import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import { userServices } from "../../../api/user";
import icon from "../../../assets/maintenance.png";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { setServices } from "../../../redux/slices/ServiceSlice";
import Loader from "../../loader/Loader";
import IService from "../../../types/IService";
import { useNavigate } from "react-router-dom";

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

  const uppercase = (str: string): string => str.toUpperCase();

  const handleServiceClick = (serviceId: string) => {
    // console.log('serviceid',serviceId);

    navigate(`/workersNearby?service=${encodeURIComponent(serviceId)}`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex items-center justify-center px-10 md:px-20">
        <div className="w-full flex flex-col md:flex-row items-center gap-20">
          <div className="max-w-60 md:w-1/3 mb-6 md:mb-0 flex items-center justify-center">
            <div className="font-oswald">
              <span className="font-semibold text-6xl w-10  ">
                LEARN MORE ABOUT OUR
              </span>{" "}
              <br />
              <span className="text-custom_buttonColor text-6xl font-semibold">
                SERVICES
              </span>
            </div>
          </div>

          <div className="w-full md:w-3/3 grid grid-cols-1 sm:grid-cols-2 mx-auto lg:grid-cols-4 gap-2">
            {services.map((service, index) => (
              <Card
                key={index}
                sx={{
                  border: "1px solid",
                  boxShadow: "none",
                  borderColor: "#D3D3D3",
                  borderRadius: "0",
                  height: "35vh",
                }}
                className="relative h-64 w-full group overflow-hidden text-custom_navyBlue flex flex-col cursor-pointer"
                onClick={() => handleServiceClick(service._id)}
              >
                <div className="absolute inset-0 bg-custom_navyBlue -translate-y-full duration-700 ease-in-out group-hover:translate-y-0"></div>
                <CardContent className="flex flex-col h-full justify-end items-center relative z-10 ease-in-out group-hover:justify-center">
                  <IconButton
                    color="primary"
                    aria-label={uppercase(service.name)}
                    className="text-4xl mb-4 transition-transform text-center duration-1000 ease-in-out text-custom_navyBlue group-hover:text-white group-hover:translate-y-0 translate-y-8"
                  >
                    <img src={icon} alt={service.name} className="w-8 h-8" />
                  </IconButton>
                  <div className="flex flex-col items-center duration-1000 ease-in-out">
                    <Typography
                      variant="h6"
                      component="h3"
                      className="text-xl font-semibold mb-2 text-center transition-transform duration-9000 ease-in-out group-hover:text-white group-hover:translate-y-0 translate-y-8 oswald-font"
                    >
                      {uppercase(service.name)}
                    </Typography>

                    <Typography
                      variant="body2"
                      className="text-gray-600 transition-transform duration-9000 ease-in-out group-hover:text-gray-300 group-hover:opacity-100 opacity-0 group-hover:translate-y-0 w-full text-center"
                    >
                      {service.description}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
