import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    fontSize: "0.875rem",
    height: "50px",
    "& fieldset": {
      borderColor: "#848484",
    },
    "&:hover fieldset": {
      borderColor: "#3B82F6",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#BFDBFC",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#6B7280",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: "14px",
    color: "#3B82F6",
  },
}));

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return <StyledTextField {...props} />;
};

export default CustomTextField;
