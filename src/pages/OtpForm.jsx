import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const OtpForm = () => {
  const [step, setStep] = useState("send");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/send-sms-otp", {
        phoneNumber,
      });
      setVerificationId(response.data.verificationId);
      setStep("verify");
      toast.success(`OTP sent successfully to ${phoneNumber}`);
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/verify-sms-otp", {
        verificationId,
        phoneNumber,
        otp,
      });
      toast.success("OTP verified successfully");
    } catch (error) {
      toast.error("Failed to verify OTP");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {step === "send" ? (
        <form
          onSubmit={handleSendOtp}
          className="bg-white p-6 rounded shadow-md"
        >
          <h2 className="text-xl font-bold mb-4">Send OTP</h2>
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded"
          >
            Send OTP
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleVerifyOtp}
          className="bg-white p-6 rounded shadow-md"
        >
          <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
          <input
            type="text"
            placeholder="Verification ID"
            value={verificationId}
            onChange={(e) => setVerificationId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded"
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default OtpForm;
