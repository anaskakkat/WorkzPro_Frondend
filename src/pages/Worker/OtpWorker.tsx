import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resendOtp } from "../../api/user";
import { verifyWorkerOtp } from "../../api/worker";
import { useDispatch } from "react-redux";
import { setWorkerInfo } from "../../redux/slices/workerSlice";

const OtpWorker: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [isResendDisabled, setIsResendDisabled] = useState<boolean>(true);
  const [resendTimer, setResendTimer] = useState<number>(60);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);
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
            return 60;
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
    setVerifyLoading(true);
    setError(null);
    try {
      const response = await verifyWorkerOtp(email, otpCode);
      console.log("OTP verified:", response);
      if (response && response.data) {
        const worker = {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          role: response.data.role,
          status: response.data.status,
          isProfileSetup: response.data.isProfileSetup,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
          wallet: response.data.wallet,
        };
        dispatch(setWorkerInfo(worker));
        navigate("/worker");

        toast.success("OTP verified successfully.");
      } else {
        toast.error("OTP verification failed.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!isResendDisabled && !resendLoading) {
      setResendLoading(true);
      setError(null);
      try {
        const response = await resendOtp(email);
        if (response) {
          toast.success(response.data.message);
          setIsResendDisabled(true);
          setResendTimer(60);
          setOtp(Array(4).fill(""));
          inputRefs.current[0]?.focus();
        } else {
          setError("Failed to resend OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error resending OTP:", error);
        setError("Failed to resend OTP. Please try again.");
      } finally {
        setResendLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-bg_blue py-8 p-4 sm:p-6 md:p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
          <h3 className="text-center text-custom_navyBlue font-bold mb-6">
            Email OTP Verification
          </h3>
          <h2 className="text-sm sm:text-sm md:text-sm text-custom_navyBlue font-normal text-center mb-6">
            OTP has been sent to <strong>{email ? email : "email"} </strong>
            Please check your email.
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
                verifyLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleVerifyClick}
              disabled={verifyLoading || resendLoading}
            >
              {verifyLoading ? "Verifying..." : "Verify"}
            </button>
            <a
              href="#"
              className={`text-navyBlue text-sm sm:text-base mt-4 ${
                isResendDisabled || resendLoading
                  ? "cursor-not-allowed opacity-50"
                  : "hover:underline"
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleResendOtp();
              }}
            >
              {resendLoading
                ? "Resending..."
                : isResendDisabled
                ? `Resend in ${resendTimer}s`
                : "Didn’t receive OTP? Resend"}
            </a>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
        <hr className="my-6 w-full border-t border-gray-300" />
      </div>
    </>
  );
};

export default OtpWorker;
