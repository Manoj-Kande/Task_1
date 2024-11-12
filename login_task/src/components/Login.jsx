import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import "./Login.css";

const Login = () => {
  const [data, setData] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate(); 

  const handleClick = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: data.username,
        password: data.password
      });
      console.log(data);
      if (response.status === 200) {
        navigate('/admin');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleClick}>
        <label>
          Username
          <input 
            type="text" 
            name="username" 
            placeholder="Enter your username" 
            onChange={handleChange} 
          />
        </label>
        <label>
          Password
          <input 
            type="password" 
            name="password" 
            placeholder="Enter your password" 
            onChange={handleChange} 
          />
        </label>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
