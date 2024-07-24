

// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { Toaster, toast } from 'sonner'
// import { setTokenWithExpiry } from '../store/accessToken';
// import { storeATLS } from '../store/accessToken';
// import { login } from '../store/authSlice';
// import axios from 'axios';

// const OTPPage = () => {
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const [emailOrPhone, setEmailOrPhone] = useState("");
//   const [method, setMethod] = useState("email"); // Default to email
//   const navigate = useNavigate();
//   const { username } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [resendDisabled, setResendDisabled] = useState(false);
//   const [resendTimer, setResendTimer] = useState(60);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     let timer;
//     if (resendDisabled) {
//       setResendTimer(60);
//       timer = setInterval(() => {
//         setResendTimer((prevTimer) => {
//           if (prevTimer > 0) {
//             return prevTimer - 1;
//           } else {
//             clearInterval(timer);
//             setResendDisabled(false);
//             return 0;
//           }
//         });
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [resendDisabled]);

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return false;
//     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

//     // Focus next input
//     if (element.nextSibling) {
//       element.nextSibling.focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const data = { code: otp.join(""), username };
//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/verify-user`,
//         {
//           method: "POST",
//           mode: "cors",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );

//       const dataFromServer = await response.json();

//       if (!dataFromServer.success) {
//         throw new Error(dataFromServer.message || "Failed to verify OTP");
//       }
//       dispatch(setTokenWithExpiry({ttl: 30000}));
//       dispatch(storeATLS(dataFromServer.data.accessToken))
//       dispatch(login())
//       navigate("/checkoutpage");
//     } catch (error) {
//       toast.error("OTP validation failed, please try again later!");
//       console.error("OTP validation error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setResendDisabled(true);
//     try {
//       const data = { "username": username, method, emailOrPhone };

//       const response = await fetch(
//         `${import.meta.env.VITE_API_URL}/api/v1/user/resend-code`,
//         {
//           method: "POST",
//           mode: "cors",
//           credentials: "include",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(data),
//         }
//       );

//       const dataFromServer = await response.json();

//       if (!dataFromServer.success) {
//         throw new Error(dataFromServer.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       console.error("resend OTP error:", error);
//     }
//   };

//   const handleSendOTP = async () => {
//     try {
//       const otpData = { username, method, emailOrPhone };
//       const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/user/send-otp`, otpData);
//       if (response.data.success) {
//         toast.success("OTP sent successfully!");
//       } else {
//         throw new Error(response.data.message || "Failed to send OTP");
//       }
//     } catch (error) {
//       toast.error("Failed to send OTP, please try again later!");
//       console.error("Send OTP error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-orange-50 flex items-center justify-center">
//       <div className="container py-2 bg-orange-50 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
//         {loading ? (
//           <div className="h-96 flex justify-center items-center z-50">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
//           </div>
//         ) : (
//           <div className="bg-white  p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-xl shadow-xl w-full max-w-md">
//             <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//               OTP Verification
//             </h1>
//             {/* <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailOrPhone">
//                 Email or Phone
//               </label>
//               <input
//                 type="text"
//                 name="emailOrPhone"
//                 id="emailOrPhone"
//                 value={emailOrPhone}
//                 onChange={(e) => setEmailOrPhone(e.target.value)}
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div> */}
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Send via
//               </label>
//               <div className="flex items-center">
//                 <input
//                   type="radio"
//                   name="method"
//                   value="email"
//                   checked={method === "email"}
//                   onChange={() => setMethod("email")}
//                   className="mr-2"
//                 />
//                 <label className="mr-4">Email</label>
//                 <input
//                   type="radio"
//                   name="method"
//                   value="phone"
//                   checked={method === "phone"}
//                   onChange={() => setMethod("phone")}
//                   className="mr-2"
//                 />
//                 <label>Phone</label>
//               </div>
//             </div>
//             <button
//               onClick={handleSendOTP}
//               className="w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mb-4"
//             >
//               Send OTP
//             </button>
//             <form onSubmit={handleSubmit} className="w-full">
//               <div className="flex justify-center mb-6">
//                 {otp.map((data, index) => (
//                   <input
//                     key={index}
//                     type="text"
//                     name="otp"
//                     maxLength="1"
//                     className="m-2 border border-gray-300 rounded w-8 h-8 md:w-10 md:h-10 text-center text-xl font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
//                     value={data}
//                     onChange={(e) => handleChange(e.target, index)}
//                     onFocus={(e) => e.target.select()}
//                   />
//                 ))}
//               </div>
//               <button
//                 type="submit"
//                 className="w-full py-2 px-4 sm:px-4 md:px-5 lg:px-6 xl:px-8 border border-transparent rounded-md shadow-sm sm:text-base text-lg font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
//               >
//                 Verify OTP
//               </button>
//             </form>
//             <p className="text-center text-gray-500 mt-4">
//               {resendDisabled ? (
//                 <span>Resend in {resendTimer} seconds</span>
//               ) : (
//                 <span>
//                   Didn't receive code?{" "}
//                   <button onClick={handleResendOTP} className="text-orange-500 hover:text-orange-600">
//                     Resend
//                   </button>
//                 </span>
//               )}
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OTPPage;
