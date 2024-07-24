import { Link } from "react-router-dom";
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/system';
import logo from "../../assets/Logo workzpro.png"



const CustomTextField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3B82F6', // Custom hover border color
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor:'#BFDBFE', 
  },
}));

const LoginPage = () => {
  const handleGoogleLogin = () => {
    // Replace this URL with your backend endpoint for Google OAuth
    window.location.href = "https://your-backend-url.com/auth/google";
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
          <Typography variant="h4" className="text-center text-custom_navyBlue font-bold">
            Login
          </Typography>
          <Typography variant="body1" className="text-center text-custom_navyBlue">
            Login to access your WorkzPro account
          </Typography>
          <Box component="form" className="space-y-4" noValidate autoComplete="off">
            <CustomTextField
              id="email"
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              required
              fullWidth
              variant="outlined"
              margin="dense" 
            />
            <CustomTextField
              id="password"
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              fullWidth
              variant="outlined"
              margin="dense" 
            />
            <Box className="flex items-center justify-between">
              <Link to="#" className="text-sm font-medium text-custom_navyBlue hover:text-custom_buttonColor">
                Forgot Password
              </Link>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              className="w-full px-4 py-2 text-sm font-medium text-white bg-custom_button_Sp rounded "
            >
              Login
            </Button>
            <Typography variant="body2" className="text-center text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="font-medium ">
               <span className="text-custom_navyBlue font-semibold hover:text-custom_buttonColor"> Sign up</span>
              </Link>
            </Typography>
            <Typography variant="body2" className="text-center text-custom_navyBlue mt-4">
              Or login with
            </Typography>
            <Button
              type="button"
              onClick={handleGoogleLogin}
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

export default LoginPage;
