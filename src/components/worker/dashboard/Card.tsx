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
      className="h-24 min-w-60 max-w-fit flex  py-4 rounded-lg border gap-2"
      style={{
        boxShadow:
          "0rem 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.1), 0rem 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex flex-col items-center lg:w-24">
        <span
          className="flex justify-center items-center w-16 h-16 rounded-lg text-white"
          style={{
            background: backgroundColor,
            boxShadow: boxShadow, // Fixed shadow for the icon
          }}
        >
          <Icon fontSize="large" />
        </span>
      </div>
      <div className="py-2 px-3">
        <p className="font-medium text-sm text-custom_navyBlue">{title}</p>
        <p className="text-center mt-2 font-bold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default Card;
