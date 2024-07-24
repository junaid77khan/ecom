import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const OtpForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const location = useLocation();
  const { product } = location.state || {};
  const navigate = useNavigate();
  const isOtpFilled = otp.every((value) => value !== "");

  useEffect(() => {
    if (!product || product.length === 0) {
      navigate("/error");
    }
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/send-sms-otp`,
        {
          phoneNumber,
        }
      );
      if (response.data.data.responseCode != 200) {
        const error = response.data.data.message;
        toast.error(error);
        return;
      }
      setVerificationId(response.data.data.data.verificationId);
      toast.success(`OTP sent successfully to ${phoneNumber}`);
      startResendTimer();
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/user/verify-sms-otp`,
        {
          method: "POST",
          body: JSON.stringify({
            verificationId,
            phoneNumber,
            otp: otp.join(""),
          }),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      if (response.data.responseCode !== 200) {
        throw new Error("Failed");
      }
      toast.success("Verification successfull");
      navigate("/checkout", { state: { product } });
    } catch (error) {
      toast.error("Verfication failed");
    }
  };

  const handleChangeOtp = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const startResendTimer = () => {
    setResendDisabled(true);
    const interval = setInterval(() => {
      setResendTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval);
          setResendDisabled(false);
          return 60;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const handleResendOtp = async () => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/user/send-sms-otp`,
        {
          phoneNumber,
        }
      );
      setVerificationId(response.data.data.verificationId);
      toast.success(`OTP resent successfully to ${phoneNumber}`);
      startResendTimer();
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full"
      >
        <div className="bg-orange-500 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">Verify Your Identity</h1>
          <p className="text-sm opacity-80">
            We need to verify your phone number before continuing
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSendOtp} className="mb-6">
            <label
              className="block text-sm font-medium text-gray-700 mb-2"
              htmlFor="phone"
            >
              Enter your phone number
            </label>
            <div className="flex items-center border-b border-orange-500 py-2">
              <input
                name="phone"
                type="tel"
                placeholder="10-digit phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
              <button
                disabled={phoneNumber.length !== 10}
                type="submit"
                className={`flex-shrink-0 ${
                  phoneNumber.length === 10
                    ? "bg-orange-500 hover:bg-orange-700"
                    : "bg-gray-300 cursor-not-allowed"
                } text-sm text-white py-1 px-4 rounded`}
              >
                Send OTP
              </button>
            </div>
          </form>

          <form onSubmit={handleVerifyOtp}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Enter OTP
            </h2>
            <div className="flex justify-evenly mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  maxLength="1"
                  className="w-12 h-12 text-center text-xl border-2  rounded-lg"
                  value={data}
                  onChange={(e) => handleChangeOtp(e.target.value, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <button
              disabled={!isOtpFilled}
              type="submit"
              className={`w-full ${
                isOtpFilled
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-300 cursor-not-allowed"
              } text-white font-bold py-2 px-4 rounded-lg transition duration-200`}
            >
              Verify OTP
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            {resendDisabled ? (
              <span>Resend in {resendTimer} seconds</span>
            ) : (
              <span>
                Didn&apos;t receive code?{" "}
                <button
                  onClick={handleResendOtp}
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  Resend
                </button>
              </span>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpForm;
