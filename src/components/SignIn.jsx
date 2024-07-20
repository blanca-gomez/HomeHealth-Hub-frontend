import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

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
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="text" value={form.email} name="email" onChange={handleInput} />
        <label>Password:</label>
        <input type="password" value={form.password} name="password" onChange={handleInput} />
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignIn;