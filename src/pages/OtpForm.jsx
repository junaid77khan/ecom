// // import { useState } from "react";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const OtpForm = () => {
// //   const [step, setStep] = useState("send");
// //   const [phoneNumber, setPhoneNumber] = useState("");
// //   const [verificationId, setVerificationId] = useState("");
// //   const [otp, setOtp] = useState("");

// //   const handleSendOtp = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await axios.post("http://localhost:8000/api/v1/user/send-sms-otp", {
// //         phoneNumber,
// //       });
// //       setVerificationId(response.data.verificationId);
// //       setStep("verify");
// //       toast.success(`OTP sent successfully to ${phoneNumber}`);
// //     } catch (error) {
// //       toast.error("Failed to send OTP");
// //     }
// //   };

// //   const handleVerifyOtp = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.post("http://localhost:8000/api/v1/user/verify-sms-otp", {
// //         verificationId,
// //         phoneNumber,
// //         otp,
// //       });
// //       toast.success("OTP verified successfully");
// //     } catch (error) {
// //       toast.error("Failed to verify OTP");
// //     }
// //   };

// //   return (
// //     <div className="max-w-md mx-auto mt-10">
// //       {step === "send" ? (
// //         <form
// //           onSubmit={handleSendOtp}
// //           className="bg-white p-6 rounded shadow-md"
// //         >
// //           <h2 className="text-xl font-bold mb-4">Send OTP</h2>
// //           <input
// //             type="text"
// //             placeholder="Phone Number"
// //             value={phoneNumber}
// //             onChange={(e) => setPhoneNumber(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded mb-4"
// //           />
// //           <button
// //             type="submit"
// //             className="w-full bg-orange-500 text-white p-2 rounded"
// //           >
// //             Send OTP
// //           </button>
// //         </form>
// //       ) : (
// //         <form
// //           onSubmit={handleVerifyOtp}
// //           className="bg-white p-6 rounded shadow-md"
// //         >
// //           <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
// //           <input
// //             type="text"
// //             placeholder="Verification ID"
// //             value={verificationId}
// //             onChange={(e) => setVerificationId(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded mb-4"
// //           />
// //           <input
// //             type="text"
// //             placeholder="Phone Number"
// //             value={phoneNumber}
// //             onChange={(e) => setPhoneNumber(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded mb-4"
// //           />
// //           <input
// //             type="text"
// //             placeholder="OTP"
// //             value={otp}
// //             onChange={(e) => setOtp(e.target.value)}
// //             className="w-full p-2 border border-gray-300 rounded mb-4"
// //           />
// //           <button
// //             type="submit"
// //             className="w-full bg-green-500 text-white p-2 rounded"
// //           >
// //             Verify OTP
// //           </button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // };

// // export default OtpForm;
// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const OtpForm = () => {
//   const [step, setStep] = useState("send");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [verificationId, setVerificationId] = useState("");
//   const [otp, setOtp] = useState(Array(4).fill(""));
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [resendTimer, setResendTimer] = useState(60);
//   const navigate = useNavigate();

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8000/api/v1/user/send-sms-otp", {
//         phoneNumber,
//       });
//       setVerificationId(response.data.verificationId);
//       setStep("verify");
//       toast.success(`OTP sent successfully to ${phoneNumber}`);
//       startResendTimer();
//     } catch (error) {
//       toast.error("Failed to send OTP");
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:8000/api/v1/user/verify-sms-otp", {
//         verificationId,
//         phoneNumber,
//         otp: otp.join(""),
//       });
//       toast.success("OTP verified successfully");
//       navigate("/checkout");
//     } catch (error) {
//       toast.error("Failed to verify OTP");
//     }
//   };

//   const handleChangeOtp = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < otp.length - 1) {
//       document.getElementById(`otp-input-${index + 1}`).focus();
//     }
//   };

//   const startResendTimer = () => {
//     setResendDisabled(true);
//     const interval = setInterval(() => {
//       setResendTimer((prevTimer) => {
//         if (prevTimer === 1) {
//           clearInterval(interval);
//           setResendDisabled(false);
//           return 60;
//         }
//         return prevTimer - 1;
//       });
//     }, 1000);
//   };

//   const handleResendOtp = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/v1/user/send-sms-otp", {
//         phoneNumber,
//       });
//       setVerificationId(response.data.verificationId);
//       toast.success(`OTP resent successfully to ${phoneNumber}`);
//       startResendTimer();
//     } catch (error) {
//       toast.error("Failed to resend OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-orange-50 flex items-center justify-center">
//       <div className="container py-2 bg-orange-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
//         {step === "send" ? (
//           <form
//             onSubmit={handleSendOtp}
//             className="bg-white p-6  sm:p-8 md:p-10 lg:p-12 xl:p-16  rounded-xl shadow-xl w-full max-w-md"
//           >
//             <h2 className="text-2xl font-bold text-center  text-gray-800 mb-4">Mobile Phone Verification</h2>
//             <p className=" flex text-center justify-center pb-4 text-[13px] text-slate-500">Enter your mobile number.</p>

//             <input
//               type="text"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded mb-4"
//             />
//             <button
//               type="submit"
//               className="w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//             >
//               Send OTP
//             </button>
//           </form>
//         ) : (
//           <form
//             onSubmit={handleVerifyOtp}
//             className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-xl shadow-xl w-full max-w-md"
//           >
//             <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Verify OTP</h2>
//             <p className=" flex text-center text-[13px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
//             <div className="flex justify-center mb-6">
//               {otp.map((data, index) => (
//                 <input
//                   key={index}
//                   type="text"
//                   id={`otp-input-${index}`}
//                   maxLength="1"
//                   className="m-2 border border-gray-300 rounded w-8 h-8 md:w-10 md:h-10 text-center text-xl font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
//                   value={data}
//                   onChange={(e) => handleChangeOtp(e.target.value, index)}
//                   onFocus={(e) => e.target.select()}
//                 />
//               ))}
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//             >
//               Verify OTP
//             </button>
//             <p className="text-center text-gray-500 mt-4">
//               {resendDisabled ? (
//                 <span>Resend in {resendTimer} seconds</span>
//               ) : (
//                 <span>
//                   Didn&apos;t receive code?{" "}
//                   <button onClick={handleResendOtp} className="text-orange-500 hover:text-orange-600">
//                     Resend
//                   </button>
//                 </span>
//               )}
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OtpForm;

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const OtpForm = () => {
  const [step, setStep] = useState("send");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState(Array(4).fill(""));
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

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
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="container py-2 bg-orange-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {step === "send" ? (
          <form
            onSubmit={handleSendOtp}
            className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 rounded-xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Mobile Phone Verification</h2>

            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleVerifyOtp}
            className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-xl shadow-xl w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Verify OTP</h2>
            <p className="flex text-center text-[13px] text-slate-500">Enter the 4-digit verification code that was sent to your phone number.</p>
            <div className="flex justify-center mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  maxLength="1"
                  className="m-2 border border-gray-300 rounded w-8 h-8 md:w-10 md:h-10 text-center text-xl font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                  value={data}
                  onChange={(e) => handleChangeOtp(e.target.value, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
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
        )}
      </div>
    </div>
  );
};

export default OtpForm;
