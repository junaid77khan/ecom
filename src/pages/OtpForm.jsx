
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

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
    if(!product || product.length === 0) {
      navigate("/error");
    }
  }, [])

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/send-sms-otp`, {
        phoneNumber,
      });
      setVerificationId(response.data.data.data.verificationId);
      setStep("verify");
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
          body: JSON.stringify(
            {
              verificationId,
              phoneNumber,
              otp: otp.join(""),
            }
          ),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      response = await response.json();
      if(response.data.responseCode !== 200) {
        throw new Error("Failed")
      }
      toast.success("Verification successfull");
      navigate("/checkout", { state: {product} });
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
      let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/send-sms-otp`, {
        phoneNumber,
      });
      setVerificationId(response.data.data.data.verificationId);
      toast.success(`OTP resent successfully to ${phoneNumber}`);
      startResendTimer();
    } catch (error) {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen  bg-orange-50 flex items-center justify-center">
      <div className="container py-2  bg-orange-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
       
          <form
            onSubmit={handleSendOtp}
            className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16  w-full max-w-lg"
          >
            <h2 className="text-2xl   font-mono  font-bold text-left text-gray-600 mb-5">Please <span className="text-red-400">verify</span> your <span className="text-red-400">Identity</span> to continue</h2>
            <div>
                <label className="text-gray-500 text-[13px]" htmlFor="phone ">Enter your phone number</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
              </div>
              <button
              
                disabled={phoneNumber.length !== 10}
                type="submit"
                className={`w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white ${phoneNumber.length === 10 ? `bg-orange-500 hover:bg-orange-600` : `bg-gray-500`} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
              >
                Send OTP
              </button>
          </form>
          <form
            onSubmit={handleVerifyOtp}
            className="bg-white px-6 pb-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-14   w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-left font-mono text-gray-600 mb-4"><span className="text-red-400">Verify</span> OTP</h2>
            <p className="flex text-left text-[13px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
            <div className="flex justify-start mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  maxLength="1"
                  className={`m-2 border border-gray-300 rounded w-8 h-8 md:w-10 md:h-10 text-center text-xl font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200`}
                  value={data}
                  onChange={(e) => handleChangeOtp(e.target.value, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <button
              disabled={!isOtpFilled}
              type="submit"
              className={`w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white ${isOtpFilled ? `bg-orange-500 hover:bg-orange-600` : `bg-gray-500`} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
            >
              Verify OTP
            </button>
            <p className="text-center text-gray-500 mt-4">
              {resendDisabled ? (
                <span>Resend in {resendTimer} seconds</span>
              ) : (
                <span>
                  Didn&apos;t receive code?{" "}
                  <button onClick={handleResendOtp} className="text-orange-500 hover:text-orange-600">
                    Resend
                  </button>
                </span>
              )}
            </p>
          </form>
      </div>
    </div>
  );
};

export default OtpForm;
