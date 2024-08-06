import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setWorkerInfo } from "../../redux/slices/workerSlice";
import { verfyloginWorker } from "../../api/worker";

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
const WorkerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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

    try {
      // console.log("submitting");

      const response = await verfyloginWorker(email, password);
      const { worker } = response;

      if (response) {
        // console.log(worker);

        toast.success(response.message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(
          setWorkerInfo({
            id: worker._id,
            name: worker.name,
            isProfileSetup: worker.isProfileSetup,
            email: worker.email,
            role: worker.role,
            phoneNumber: worker.phoneNumber,
            status: worker.status,
          })
        );
        navigate("/worker");
      }
    } catch (error) {
      // toast.error("Failed to login. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="bg-custom_bg_blue">
      <Container className="min-h-screen flex items-center justify-center pt-8">
        <Box className="w-full max-w-md p-8 bg-white rounded shadow-lg space-y-4 mx-auto">
          <Typography
            variant="h4"
            className="text-center text-custom_navyBlue font-bold"
          >
            Worker Login
          </Typography>
          <Typography
            variant="body1"
            className="text-center text-custom_navyBlue"
          >
            Login to access your WorkzPro Worker account
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
            <Box className="flex items-center justify-between">
              <Link
                to="#"
                className="text-sm font-medium text-custom_navyBlue hover:text-custom_buttonColor"
              >
                Forgot Password
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-custom_button_Sp rounded"
            >
              Login
            </Button>
            <Typography
              variant="body2"
              className="text-center text-gray-600 mt-4"
            >
              Don't have an account?{" "}
              <Link to="/worker/signup" className="font-medium ">
                <span className="text-custom_navyBlue font-semibold hover:text-custom_buttonColor">
                  {" "}
                  Sign up
                </span>
              </Link>
            </Typography>
            <Typography
              variant="body2"
              className="text-center text-custom_navyBlue mt-4"
            >
              Or login with
            </Typography>
            <Button
              sx={{
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
                borderColor: "#4285F4",
              }}
              type="button"
              fullWidth
              variant="outlined"
              startIcon={
                <svg
                  className="w-5 h-5 mr-2"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="#4285F4"
                    d="M488 261.8c0-15.2-1.4-29.9-4-44H250v85.2h133.9c-5.8 29.7-23.5 54.8-49.9 71.4l79.8 62c46.6-42.9 73.2-106 73.2-174.6z"
                  />
                  <path
                    fill="#34A853"
                    d="M250 484c64.7 0 118.9-21.5 158.6-57.6l-79.8-62c-22.2 14.9-50.4 23.8-78.8 23.8-61.6 0-113.8-41.6-132.5-97.4H54v61.4C94.3 450.6 167.5 484 250 484z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M117.5 307.8c-8.8-26.4-8.8-54.6 0-81l-79.8-62C7.4 194.4 0 221.2 0 250s7.4 55.6 37.8 81.2l79.8-62.4z"
                  />
                  <path
                    fill="#EA4335"
                    d="M250 108.4c28.4 0 54.8 10.4 75.3 27.5l55.6-55.6C343.9 48.5 300.1 30 250 30 167.5 30 94.3 63.4 54 117.5l79.8 62c18.7-55.8 70.9-97.4 132.5-97.4z"
                  />
                </svg>
              }
            >
              Sign in with Google
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default WorkerLogin;
