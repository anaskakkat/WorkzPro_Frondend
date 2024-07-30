import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/Logo workzpro.png";
import { useDispatch } from "react-redux";
import { setadminInfo } from "../../redux/slices/adminSlice";
import { verifyloginAdmin } from "../../api/admin";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=\S)(?=\S{8,})/;

const CustomTextField = styled(TextField)(() => ({
  "& .MuiInputBase-root": {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#01B7F2",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#BFDBFE",
  },
}));

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!passwordRegex.test(password)) {
      return "Password must be at least 8 characters long and contain no spaces.";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(validateEmail(newEmail));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordError(validatePassword(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!email.trim()) {
      setEmailError("Please enter your email");
      toast.error("Please enter your email");
      isValid = false;
    } else if (validateEmail(email)) {
      toast.error("Please enter a valid email");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      toast.error("Please enter your password");
      isValid = false;
    } else if (validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain no spaces."
      );
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true); // Set loading to true before making the API call

    try {
      const response = await verifyloginAdmin(email, password);

      console.log("response--", response);
      if (response.admin) {
        toast.success(response.message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setadminInfo(response.admin));
        navigate("/admin");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to login. Please try again.");
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false after the API call completes
    }
  };

  return (
    <div className="bg-custom_bg_blue">
      <nav className="bg-white border-b-2 border-custom_lightBlue shadow-custom">
        <div className="flex items-center justify-center h-16">
          <Link to="/" aria-label="logo" className="flex items-center">
            <img src={logo} width={50} height={50} alt="Logo" />
          </Link>
        </div>
      </nav>

      <Container className="min-h-screen flex items-center justify-center">
        <Box className="w-full max-w-md p-8 bg-white rounded shadow-lg space-y-4 mx-auto mt-6">
          <Typography
            variant="h4"
            className="text-center text-custom_navyBlue font-bold"
          >
            Admin Login
          </Typography>
          <Typography
            variant="body1"
            className="text-center text-custom_navyBlue"
          >
            Login to access your WorkzPro admin account
          </Typography>
          <Box
            component="form"
            className="space-y-4"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <CustomTextField
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              margin="dense"
              value={email}
              onChange={handleEmailChange}
              error={!!emailError}
              helperText={emailError}
            />

            <CustomTextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              margin="dense"
              value={password}
              onChange={handlePasswordChange}
              helperText={passwordError}
              error={!!passwordError}
            />
            <Box className="flex items-center justify-between"></Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-custom_button_Sp rounded"
              disabled={loading} 
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"} {/* Show spinner or text */}
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default AdminLogin;
