import  { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      console.log(res.data);
    } catch (error) {
      setError('Invalid email or password');
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
    />
  );
};

export default Login;
