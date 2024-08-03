import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FaArrowLeft } from 'react-icons/fa';
import {Font} from '@react-email/font' 

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { setUser, setToken } = useUser();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user); 
        console.log(data)
        setToken(data.token);
        localStorage.setItem('token', data.token)
        navigate('/dashboard');
      } else {
        setMessage('Error al iniciar sesión');
      }
    } catch (error) {
      setMessage(error.message || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="register-container">
      <h2>
        <FontAwesomeIcon icon={faUser} /> 
        <Font fontFamily="Roboto"/><p>Iniciar sesión</p>
      </h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Email:</label>
        <input type="text" value={form.email} name="email" onChange={handleInput} />
        <label>Password:</label>
        <input type="password" value={form.password} name="password" onChange={handleInput} />
        <button type="submit" className="submit-buttons">Sign In</button>
      </form>
      <FaArrowLeft className="arrow-icon" onClick={() => navigate('/')}/>
    </div>
  );
};

export default SignIn;