import React from "react";
import { SvgIconComponent } from "@mui/icons-material";

interface CardProps {
  icon: SvgIconComponent;
  title: string;
  value: number;
  backgroundColor: string;
  boxShadow: string;
}

const Card: React.FC<CardProps> = ({
  icon: Icon,
  title,
  value,
  backgroundColor,
  boxShadow,
}) => {
  return (
    <div
      className="flex flex-col lg:flex-row h-auto min-w-full lg:min-w-60 lg:max-w-fit py-4 rounded-lg border gap-4 lg:gap-2 p-4"
      style={{
        boxShadow:
          "0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex justify-center items-center w-full lg:w-24 mb-4 lg:mb-0">
        <span
          className="flex justify-center items-center w-16 h-16 rounded-lg text-white"
          style={{
            background: backgroundColor,
            boxShadow: boxShadow,
          }}
        >
          <Icon fontSize="large" />
        </span>
      </div>
      <div className="flex flex-col justify-center text-center lg:text-left lg:py-2 lg:px-3">
        <p className="font-medium text-sm lg:text-base text-custom_navyBlue">
          {title}
        </p>
        <p className="mt-2 font-bold text-2xl lg:text-xl">{value}</p>
      </div>
    </div>
  );
};

export default Card;
