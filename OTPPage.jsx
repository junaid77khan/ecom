import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { code: otp.join("") };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/user/verify-user`,
        {
          method: "POST",
          mode: "cors",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const dataFromServer = await response.json();

      if (!dataFromServer.success) {
        throw new Error(dataFromServer.message || "Failed to verify OTP");
      }

      toast.success("OTP validated successfully!");
      navigate("/categories");
    } catch (error) {
      toast.error("OTP validation failed, please try again later!");
      console.error("OTP validation error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container py-2 bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {loading ? (
          <div className="h-96 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="bg-white  p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 rounded-xl shadow-xl w-full max-w-md">
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Email Verification
            </h1>
            <p className="text-center text-gray-600 mb-8">
              We have sent a code to your email{" "}
              <span className="font-medium">{username}</span>
            </p>
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex justify-center mb-6">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    name="otp"
                    maxLength="1"
                    className="m-2 border border-gray-300 rounded w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-14 lg:h-14 text-center text-xl font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
                    value={data}
                    onChange={(e) => handleChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                  />
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 sm:py-2 sm:px-6 md:py-3 md:px-8 lg:py-4 lg:px-10 xl:py-5 xl:px-12 border border-transparent rounded-md shadow-sm text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Verify Account
              </button>
            </form>
            <p className="text-center text-gray-500 mt-4">
              Didn&apos;t receive code?{" "}
              <a href="#" className="text-orange-500 hover:text-orange-600">
                Resend
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OTPPage;
