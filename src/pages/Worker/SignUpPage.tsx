import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { toast } from "react-hot-toast";
import logo from "../../assets/Logo workzpro.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerWorker } from "../../api/worker";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])\S{8,}$/;
const phoneRegex = /^[0-9]{10}$/;

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

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateName = (name: string) => {
    if (!name.trim()) {
      return "Name is required";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (!passwordRegex.test(password)) {
      return "Password must be at least one letter (uppercase or lowercase)at least one digit at least one special character from the set A minimum length of 8 characters.";
    }
    return "";
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (confirmPassword !== password) {
      return "Passwords do not match.";
    }
    return "";
  };

  const validatePhoneNumber = (phone: string) => {
    if (!phoneRegex.test(phone)) {
      return "Invalid phone number. Must be 10 digits.";
    }
    return "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    setNameError(validateName(newName));
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

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setConfirmPasswordError(validateConfirmPassword(newConfirmPassword));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhoneNumber(newPhone);
    setPhoneError(validatePhoneNumber(newPhone));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (validateName(name)) {
      setNameError(validateName(name));
      toast.error("Please enter your name");
      isValid = false;
    }

    if (!email.trim()) {
      setEmailError("Please enter your email");
      toast.error("Please enter your email");
      isValid = false;
    } else if (validateEmail(email)) {
      setEmailError(validateEmail(email));
      toast.error("Please enter a valid email");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Please enter your password");
      toast.error("Please enter your password");
      isValid = false;
    } else if (validatePassword(password)) {
      setPasswordError(validatePassword(password));
      toast.error(
        "Password must be at least 8 characters long and contain no spaces."
      );
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      toast.error("Please confirm your password");
      isValid = false;
    } else if (validateConfirmPassword(confirmPassword)) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword));
      toast.error("Passwords do not match");
      isValid = false;
    }

    if (!phoneNumber.trim()) {
      setPhoneError("Please enter your phone number");
      toast.error("Please enter your phone number");
      isValid = false;
    } else if (validatePhoneNumber(phoneNumber)) {
      setPhoneError(validatePhoneNumber(phoneNumber));
      toast.error("Invalid phone number. Must be 10 digits.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerWorker({
        name,
        email,
        password,
        phoneNumber,
      });
      console.log("response:", response);

      if (response) {
        toast.success(response.message);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        navigate("/worker/otp", { state: { email: email } });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
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
            Sign Up
          </Typography>
          <Typography
            variant="body1"
            className="text-center text-custom_navyBlue"
          >
            Create your WorkzPro account
          </Typography>
          <Box
            component="form"
            className="space-y-4"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <CustomTextField
              id="name"
              name="name"
              label="Name"
              required
              fullWidth
              variant="outlined"
              margin="dense"
              value={name}
              onChange={handleNameChange}
              error={!!nameError}
              helperText={nameError}
            />
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
            />{" "}
            <CustomTextField
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="text"
              required
              fullWidth
              variant="outlined"
              margin="dense"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              error={!!phoneError}
              helperText={phoneError}
            />
            <CustomTextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              margin="dense"
              value={password}
              onChange={handlePasswordChange}
              helperText={passwordError}
              error={!!passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <CustomTextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="off"
              required
              fullWidth
              variant="outlined"
              margin="dense"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-custom_blue text-white"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              startIcon={isLoading && <CircularProgress size={24} />}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Box>
          <Typography
            variant="body2"
            className="text-center text-custom_navyBlue"
          >
            Already have an account?{" "}
            <Link to="/login" className="text-custom_blue">
              Log In
            </Link>
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default SignUpPage;
