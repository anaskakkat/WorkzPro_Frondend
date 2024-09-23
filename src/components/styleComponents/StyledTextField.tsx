import  { forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { styled } from "@mui/system";

const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    fontSize: "0.875rem",
    height: "45px",
    "& fieldset": {
      // borderColor: "#848884",
    },
    "&:hover fieldset": {
      borderColor: "#49a3f1",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#BFDBFC",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    color: "#6B7280",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: "14px",
    color: "#3B82F6",
  },
}));

const CustomTextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  return <StyledTextField {...props} inputRef={ref} />;
});

export default CustomTextField;
