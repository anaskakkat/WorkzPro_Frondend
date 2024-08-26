import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Container, Typography, Button, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setWorkerInfo } from "../../redux/slices/workerSlice";
import { verfyloginWorker, workerGoogleLogin } from "../../api/worker";
import CustomTextField from "../../components/styleComponents/StyledTextField";
import { GoogleLogin } from "@react-oauth/google";
import { IGoogleUser } from "../../types/user";
import { jwtDecode } from "jwt-decode";
import logo from "/workzpro-high-resolution-logo.jpeg";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=\S)(?=\S{8,})/;

const WorkerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
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
      toast.error("Password must be at least 8 characters long and contain no spaces.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setLoading(true);

    try {
      const response = await verfyloginWorker(email, password);
      const { worker } = response;

      if (response) {
        toast.success(response.message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(setWorkerInfo(worker));
        navigate("/worker");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decodedToken: IGoogleUser = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google user:", decodedToken);
      const googleUser = {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        googleId: decodedToken.sub,
      };
      const response = await workerGoogleLogin(googleUser);
      dispatch(setWorkerInfo(response.data));
      toast.success(response.message);
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed");
  };

  return (
    <div className="flex items-center mx-auto max-w-full justify-center h-screen bg-blue-50">
      <div className="bg-white border-2 rounded shadow-lg flex flex-col sm:flex-row items-center max-w-4xl mx-4 md:mx-auto">
        {/* Left Side: Logo */}
        <div className="flex justify-center items-center max-w-xs p-4 md:border-r-2">
          <img src={logo} alt="WorkzPro Logo" className=" sm:w-auto sm:h-auto" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full p-8 rounded-md">
          <Typography variant="h5" className="text-center text-custom_navyBlue font-bold">
            Worker Login
          </Typography>
          <Box component="form" className="space-y-4" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
              error={!!passwordError}
              helperText={passwordError}
            />
            <div className="flex items-center justify-between">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="w-full px-4 py-2 text-sm font-medium text-white bg-custom_button_Sp rounded"
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
              </Button>
              <Link to="#" className="text-sm font-light text-custom_navyBlue hover:text-custom_buttonColor">
                Forgot Password
              </Link>
            </div>
            {/* <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <div className="text-gray-700 text-center text-sm">Or login with</div>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div> */}
            {/* <div className="flex justify-center">
              <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
            </div> */}
            <Typography variant="body2" className="text-center text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link to="/worker/signup" className="font-medium">
                <span className="text-custom_navyBlue font-semibold hover:text-custom_buttonColor">
                  Sign up
                </span>
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;
