import  { useState } from 'react';
import AuthForm from '../components/AuthForm';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const[username, setUsername] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[usernameErrMessage, setUsernameErrMessage] = useState("Empty");
  const[emailErrMessage, setEmailErrMessage] = useState("Empty");
  const[passwordErrMessage, setPasswordErrMessage] = useState("Empty");
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const[loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUsernameErrMessage("Empty")
    setEmailErrMessage("Empty")
    setPasswordErrMessage("Empty")
    try {
<<<<<<< HEAD
      const res = await axios.post('http://localhost:8000/api/v1/auth/register', { username, email, password });
      console.log(res.data);
=======
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
        const data = dataFromServer.data;
        if(data?.usernameError?.length > 0) {
          setUsernameErrMessage(data.usernameError)
        }
        if(data?.emailError?.length > 0) {
          setEmailErrMessage(data.emailError);
        }
        if(data?.passwordError?.length > 0) {
          setPasswordErrMessage(data.passwordError);
        }
        return;
      }

      navigate(`/otp-verification/${username}`);
>>>>>>> f9bbcb723d8a497442937047940ea0ffc04838e1
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
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
      usernameErrMessage={usernameErrMessage}
      emailErrMessage={emailErrMessage}
      passwordErrMessage={passwordErrMessage}
    />
  );
};

export default Register;
