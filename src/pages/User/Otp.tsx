import React, { useState, useRef, useEffect } from "react";
import Logo from "../../assets/Logo workzpro.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios"; // Ensure axios is installed: npm install axios
import toast from "react-hot-toast";
import { resendOtp, verifyotp } from "../../api/user";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/userSlices";

interface Resp {
  data: string;
  user?: {
    userName: string;
    email: string;
    phoneNumber: number;
    password: string;
    wallet: number;
    isBlocked: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  message: string;
}

const Otp: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [resendTimer, setResendTimer] = useState(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const location = useLocation();
  const email = location.state?.email || "Email not found";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isResendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            clearInterval(timer as NodeJS.Timeout);
            return 60; // Reset timer
          } else {
            return prev - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer as NodeJS.Timeout);
  }, [isResendDisabled]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) {
      e.target.value = value.replace(/[^0-9]/g, "");
    }

    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    if (e.target.value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerifyClick = () => {
    if (otp.some((value) => value === "")) {
      toast.error("All fields are required.");
      return;
    }
    verifyOtp(otp.join(""));
  };

  const verifyOtp = async (otpCode: string): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<Resp> = await verifyotp(email, otpCode);
      if (response.status === 200) {
        toast.success(response.data.message);
        console.log("OTP verified:", response);
        const user = response.data.user;
        console.log("user:", user);

        dispatch(setUserInfo(user));
        navigate("/");
      } else {
        toast.error(response.data.message);
        console.error("Unexpected response:", response);
        setError("Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!isResendDisabled) {
      setLoading(true);
      try {
        const response: AxiosResponse<Resp> = await resendOtp(email);
        toast.success(response.data.message);
        console.log("OTP resent", response);
        setIsResendDisabled(true);
        setResendTimer(60);
        setError(null);
      } catch (error) {
        console.error("Error resending OTP:", error);
        setError("Failed to resend OTP. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <nav className="bg-white border-b-2 border-custom_lightBlue shadow-custom">
        <div className="flex items-center justify-center h-16">
          <Link to="/" aria-label="logo" className="flex items-center">
            <img src={Logo} width={50} height={50} alt="Logo" />
          </Link>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg_blue p-4 sm:p-6 md:p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <h3 className="text-center text-custom_navyBlue font-bold mb-6">
            OTP
          </h3>
          <h2 className="text-sm sm:text-sm md:text-sm text-custom_navyBlue font-normal text-center mb-6">
            OTP sent to your email, please check.
          </h2>
          <div className="flex flex-col items-center mb-4 w-full">
            <div className="flex flex-wrap justify-center mb-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {Array(4)
                .fill("")
                .map((_, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    className="w-12 sm:w-14 h-12 mx-1 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    value={otp[index]}
                    onChange={(e) => handleInput(e, index)}
                  />
                ))}
            </div>
            <button
              className={`w-40 sm:w-60 md:w-60 lg:w-60 bg-custom_button_Sp text-white py-2 rounded-lg shadow-lg hover:bg-custom_buttonColor transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleVerifyClick}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <a
              href="#"
              className={`text-navyBlue text-sm sm:text-base mt-4 ${
                isResendDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:underline"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleResendOtp();
              }}
            >
              {isResendDisabled
                ? `Resend in ${resendTimer}s`
                : "Didn’t receive OTP? Resend"}
            </a>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
        <hr className="my-6 w-full border-t border-gray-300" />
        {/* Additional content can go here */}
      </div>
    </>
  );
};

export default Otp;
