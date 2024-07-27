import React, { useState, FormEvent } from "react";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/user";
import toast from "react-hot-toast";
import logo from '../../assets/Logo workzpro.png'
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

type FormData = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = {
  name: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Define regex patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/; // Assumes a 10-digit phone number
  const nameRegex = /^(?!^\s)(?!.*\s$)(?!\s*$)[a-zA-Z\s'-]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    };

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name =
        "Name must not start or end with spaces and must contain at least one non-space character";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!phoneRegex.test(formData.mobile)) {
      newErrors.mobile = "Invalid mobile number";
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const formErrors = validateForm();

    if (
      Object.keys(formErrors).some((key) => formErrors[key as keyof FormErrors])
    ) {
      setErrors(formErrors);
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await signUp(formData);

      const {message, email } = response.data;
      console.log("Response:", response.data);
      if (response.status === 200) {
        toast.success(message);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/otp", { state: { email } });
      } else {
        toast.error(message)
      }
    } catch (error) {
      console.error("Error during signUp:", error);
      toast.error("An error occurred during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-custom_bg_blue min-h-screen">
        <nav className="bg-white border-b-2 border-custom_lightBlue shadow-custom">
          <div className="flex items-center justify-center h-16">
            <Link to="/" aria-label="logo" className="flex items-center">
              <img src={logo} width={50} height={50} alt="Logo" />
            </Link>
          </div>
        </nav>

        <div className="flex items-center justify-center pt-6">
          <Container component="main" maxWidth="sm">
            <Paper className="py-4 px-10 w-10/12 mx-auto bg-white rounded  " elevation={1}>
              <Typography
                variant="h5"
                component="h6"
                className="text-center font-bold text-custom_navyBlue"
              >
                Sign Up
              </Typography>
{/* <hr className="mt-2 w-40 mx-auto" /> */}
              <form onSubmit={handleSubmit}>
                <CustomTextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="name"
                  InputProps={{
                    style: { height: 50 },
                  }}
                  style={{ marginBottom: "0px" }}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />

                <CustomTextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="email"
                  InputProps={{
                    style: { height: 50 },
                  }}
                  style={{ marginBottom: "0px" }}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />

                <CustomTextField
                  label="Mobile Number"
                  type="tel"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="mobile"
                  InputProps={{
                    style: { height: 50 },
                  }}
                  style={{ marginBottom: "0px" }}
                  onChange={handleChange}
                  error={!!errors.mobile}
                  helperText={errors.mobile}
                />

                <CustomTextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="password"
                  InputProps={{
                    style: { height: 50 },
                  }}
                  style={{ marginBottom: "0px" }}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />

                <CustomTextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  name="confirmPassword"
                  InputProps={{
                    style: { height: 50 },
                  }}
                  style={{ marginBottom: "10px" }}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Get OTP"}
                </Button>
              </form>
              <div className="text-center mt-4">
                <Typography variant="body2" className="text-custom_navyBlue">
                  Already have an account?{" "}
                  <Link to="/login" className="text-black font-semibold hover:text-custom_buttonColor">
                    Login Here
                  </Link>
                </Typography>
              </div>
            </Paper>
          </Container>
        </div>
      </div>
    </>
  );
};

export default SignUp;
