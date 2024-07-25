import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';


const Home = () => {
  return (
    <div className='home-container'>
      <img src='/corazón.jpg' alt='heart-logo' className='heart-logo'/>
      <div className='welcome-api'>
      <h1> HomeHealth Hub</h1>
        <p>La platafroma que te permite gestionar tu salud personal.</p>
        <p>Registrate y de esta froma podrás mantener tu historial clínico actualizado
          para poder compartir con diferentes profesionales médicos </p>
          <p>¡Únete y toma el control de tu bienestar!</p>
      </div>
        <nav className='welcome-buttons'>
          <button><Link to='/signUp'>Registrarse</Link></button>
          <button><Link to='/signIn'>Iniciar sesión</Link></button>
        </nav>
      </div>
  )
};

export default Home;