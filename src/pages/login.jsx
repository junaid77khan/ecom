import  { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../store/authSlice';
import { storeATLS } from '../store/accessToken';
import { setTokenWithExpiry } from '../store/accessToken';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {

      const data = {
        "email": email,
        "password": password
      }
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/user/signin`, {
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
        throw new Error("Failed to signin. Please try again.");
        return;
      }

      dispatch(setTokenWithExpiry({ttl: 30000}));
      dispatch(storeATLS(dataFromServer.data.accessToken))
      dispatch(login())
      navigate(`/categories`);
    } catch (error) {
      throw new Error("Failed to signin. Please try again.");
        return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      isLogin={true}
      handleSubmit={handleSubmit}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
    />
  );
};

export default Login;
