import  { useState } from 'react';
import AuthForm from '../components/AuthForm';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      console.log(res.data);
    } catch (error) {
      setError('Registration failed. Please try again.');
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
    />
  );
};

export default Register;
