import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setWorkerInfo } from "../../redux/slices/workerSlice";
import { verfyloginWorker } from "../../api/worker";
import CustomTextField from "../../components/styleComponents/StyledTextField";
import { cn } from "@/lib/utils";

import logo from "/workzpro-high-resolution-logo.jpeg";
import { validateEmail, validatePassword } from "@/utils/formValidations";
import DotPattern from "@/components/magicui/dot-pattern";

const WorkerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!email.trim()) {
      toast.error("Please enter your email");
      isValid = false;
    } else if (validateEmail(email)) {
      toast.error("Please enter a valid email");
      isValid = false;
    }

    if (!password.trim()) {
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

  return (
    <div className="flex sm:h-[calc(100vh)] ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] bg-blue-50 "
        )}
      />

      <div className="flex mx-auto mt-20 border items-center h-fit   sm:w-fit shadow-lg  flex-col   sm:flex-row sm:m-auto bg-white z-0 rounded-md">
        {/* Left Side: Logo */}
        <div className="flex  mt-6 lg:max-w-80  lg:py-8 px-5 sm:border-r sm:mt-0 sm:w-64  ">
          <img
            src={logo}
            alt="WorkzPro Logo"
            className="w-32  mx-auto sm:w-fit"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-96 p-8 rounded-md">
          <h5 className="text-sm md:text-xl">Worker Login</h5>
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
            />
            <div className="flex flex-col sm:flex-row items-center justify-between">
            <button className="px-4 py-2 w-full sm:w-2/4 text-sm font-medium text-white bg-custom-gradient-blue rounded-md">
                {loading ? (
                  <CircularProgress size={12} color="inherit" />
                ) : (
                  "Login"
                )}
              </button>
              <Link
                to="#"
                className="text-sm mt-2 sm:mt-0 font-light text-custom_navyBlue hover:text-custom_buttonColor"
              >
                Forgot Password
              </Link>
            </div>

            <div className="text-gray-600 text-xs text-center">
              Don't have an account?{" "}
              <Link to="/worker/signup" className="font-medium">
                <span className="text-custom_navyBlue font-semibold hover:text-custom_buttonColor">
                  Sign up
                </span>
              </Link>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default WorkerLogin;
