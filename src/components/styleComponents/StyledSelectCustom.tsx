import { styled } from "@mui/material/styles";
import { Select } from "@mui/material";
const StyledSelectCustom = styled(Select)(() => ({
  "& .MuiOutlinedInput-root": {
    fontSize: "10px",
    height: "45px",
    "& fieldset": {
    },
    "&:hover fieldset": {
      borderColor: "#FF0000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FF0000",
    
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "12px",
    color: "#FF0000",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    fontSize: "18px",
    color: "#FF0000",
  },
  "& .MuiSelect-select": {
    padding: "12px",
    fontSize: "14px",
    
  },
}));

export default StyledSelectCustom;
