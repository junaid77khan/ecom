import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    totalOrders: 0,
    address: '',
  });

  useEffect(() => {
    // Fetch user data from backend
    axios.get('/api/user/profile')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, []);

  const handlePasswordReset = () => {
    // Logic for handling password reset
    axios.post('/api/user/forgot-password', { email: userData.email })
      .then(response => {
        alert('Password reset link has been sent to your email.');
      })
      .catch(error => {
        console.error('There was an error sending the password reset link!', error);
      });
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <p className="text-gray-900">{userData.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <p className="text-gray-900">{userData.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone:</label>
          <p className="text-gray-900">{userData.phone}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Total Orders:</label>
          <p className="text-gray-900">{userData.totalOrders}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address:</label>
          <p className="text-gray-900">{userData.address}</p>
        </div>
        <button
          onClick={handlePasswordReset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Forgot Password
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
