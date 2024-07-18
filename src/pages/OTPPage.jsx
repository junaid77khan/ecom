import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const { username } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const data = {
            "code": otp
        }
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/verify-user`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              data
            )
          });

      const dataFromServer = await response.json();

      if (!dataFromServer.success) {
        throw new Error(dataFromServer.message || 'Failed to verify OTP');
      }

      toast.success('OTP validated successfully!');

      navigate('/categories');
    } catch (error) {
      toast.error('OTP validation failed, please try again later!');
      console.error('OTP validation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-20 w-full h-full bg-orange-50  flex flex-col justify-center items-center">
      {loading ? (
        <div className="h-96 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className='border w-80 md:w-96 font-semibold border-gray-200 flex flex-col justify-center items-start px-4 py-10 h-[30rem] shadow-lg bg-white rounded-lg'>
          <h1 className="text-2xl mb-4">Verify with OTP</h1>
          <h1 className='text-gray-500'>Sent to {username}</h1> {/* Render username here */}
          <form onSubmit={handleSubmit} className="w-full mt-5">
            <div className="mb-4">
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="my-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
              <label htmlFor="otp" className="block text-sm font-medium text-gray-500">
                6 digits
              </label>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Submit OTP
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default OTPPage;
