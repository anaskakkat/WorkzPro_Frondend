import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { verfylogin } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/userSlices";

import { jwtDecode } from "jwt-decode";

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
import { GoogleLogin } from "@react-oauth/google";
interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}
const LoginPage: React.FC = () => {
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
      const response = await verfylogin(email, password);
      // console.log("response:", response);

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
    }
  };
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log("Google credential response:", credentialResponse);
      const decodedToken: GoogleUser = jwtDecode(credentialResponse.credential);
      console.log("Decoded Google user:", decodedToken);
      const googleUser = {
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        googleId: decodedToken.sub
      };
      toast.success("Google login successful");
      dispatch(setUserInfo(googleUser));
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
    <div className="bg-custom_bg_blue">
      <Container className="min-h-screen flex items-center justify-center">
        <Box className="w-full max-w-md p-8 bg-white rounded shadow-lg space-y-4 mx-auto mt-6">
          <Typography
            variant="h4"
            className="text-center text-custom_navyBlue font-bold"
          >
            Login
          </Typography>
          <Typography
            variant="body1"
            className="text-center text-custom_navyBlue"
          >
            Login to access your WorkzPro account
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
              <Link to="/signup" className="font-medium ">
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
            <Box className="flex justify-center mt-4">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
