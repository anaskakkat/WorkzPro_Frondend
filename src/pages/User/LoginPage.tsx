import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { toast } from "react-hot-toast";
import { googleAuth, verfylogin } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/userSlices";
import logo from "/workzpro-high-resolution-logo.jpeg";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import CustomTextField from "../../components/styleComponents/StyledTextField";
import { IGoogleUser } from "../../types/user";
import { validateEmail, validatePassword } from "../../utils/formValidations"; // Import validation functions
import { cn } from "@/lib/utils";
import DotPattern from "@/components/magicui/dot-pattern";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      const response = await verfylogin(email, password);
      if (response) {
        const { user, message } = response.data;
        if (user) {
          toast.success(message);
          await new Promise((resolve) => setTimeout(resolve, 1000));
          dispatch(setUserInfo(user));
          navigate("/");
        } else {
          toast.error(message);
        }
      }
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const decodedToken: IGoogleUser = jwtDecode(
        credentialResponse.credential
      );
      const googleUser = {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        googleId: decodedToken.sub,
      };
      const response = await googleAuth(googleUser);
      toast.success("Google login successful");
      dispatch(setUserInfo(response.data.user));
      navigate("/");
    } catch (error) {
      toast.error("Google login failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google login failed");
  };

  return (
    <div className="flex sm:h-[calc(100vh)] ">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)] bg-blue-50 "
        )}
      />

      <div className="flex mx-auto mt-20 border items-center h-fit   sm:w-fit shadow-lg  flex-col   sm:flex-row sm:m-auto bg-white z-0 rounded-md">
        <div className="flex  mt-6 lg:max-w-80  lg:py-8 px-5 sm:border-r sm:mt-0 sm:w-64  ">
          <Link to={"/"}>
            <img
              src={logo}
              alt="WorkzPro Logo"
              className="w-32  mx-auto sm:w-fit"
            />
          </Link>
        </div>
        <div className="w-96 p-8 rounded-md">
          <h5 className="text-sm md:text-xl">Login</h5>
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
              required
              variant="outlined"
              margin="dense"
              fullWidth
              value={email}
              onChange={handleEmailChange}

            />
            <CustomTextField
              id="password"
              name="password"
              label="Password"
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
                  <CircularProgress size={24} color="inherit" />
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
            <div className="flex items-center justify-center ">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <div className="text-gray-700 text-center text-xs">
                Or login with
              </div>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
            <div className="text-gray-600 text-xs text-center">
              Don't have an account?{" "}
              <Link to="/signup">
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

export default LoginPage;
