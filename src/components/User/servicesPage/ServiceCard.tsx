import React from "react";
import { CardContent, Typography, IconButton } from "@mui/material";
import icon from "../../../assets/maintenance.png";
import IService from "../../../types/IService";

interface ServiceCardProps {
  service: IService;
  handleClick: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, handleClick }) => {
  const uppercase = (str: string): string => str.toUpperCase();

  return (
    <div

      className="relative group overflow-hidden border min-h-56 min-w-28 text-custom_navyBlue flex flex-col cursor-pointer"
      onClick={() => handleClick(service._id)}
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
    </div>
  );
};

export default ServiceCard;
