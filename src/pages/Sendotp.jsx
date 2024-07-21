import React, { useState } from 'react';
import axios from 'axios';

function SendOtp() {
  const [view, setView] = useState('home');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpId, setOtpId] = useState('');

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/send-otp', { phone });
      setMessage('OTP sent successfully!');
      setOtpId(response.data.otpId);
      setView('verifyOtp');
    } catch (error) {
      setMessage('Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/verify-otp', { otpId, otp });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to verify OTP');
    }
  };

  return (
    <div className="SendOtp">
      {view === 'home' ? (
        <div>
          <h1>Home Page</h1>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div>
          <h1>Verify OTP</h1>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          {message && <p>{message}</p>}
          <button onClick={() => setView('home')}>Back to Home</button>
        </div>
      )}
    </div>
  );
}

export default SendOtp;
``