import  { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokenWithExpiry } from '../store/accessToken';
import { storeATLS } from '../store/accessToken';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const data = {
        "username": username,
        "email": email,
        "password": password
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/signup`, {
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

      if(!dataFromServer.success) {
        toast.error("Failed to sigup. Please try again.");
        return;
      }

      toast.success("Sign up successfully");

      dispatch(setTokenWithExpiry({ttl: 30000}));
      dispatch(storeATLS(dataFromServer.data.accessToken))
      dispatch(login())
      navigate(`/otp-verification/${dataFromServer.data.createdUser[0].username}`);
    } catch (error) {
      toast.error("Failed to sigup. Please try again.");
        return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      isLogin={false}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      username={username}
      setUsername={setUsername}
      error={error}
      loading={loading}
    />
  );
};

export default Register;
