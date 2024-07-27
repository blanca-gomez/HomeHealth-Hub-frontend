import React from 'react';
import { useUser} from './UserContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileMedical} from '@fortawesome/free-solid-svg-icons';
import {Font} from '@react-email/font';
import Calendar from './Calendar';
import Weather from './Weather';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div className='hellow-user'>
      {user ? (
        <div className='dashboard-header'>
          <h2><Font fontFamily="Roboto"/><FontAwesomeIcon icon={faFileMedical} />¡Bienvenido/a {user.firstName}!</h2>
          <button className='miPerfil-button'><Link to='/user'>Mi perfil</Link></button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
      <nav className='nav-options'>
        <ul>
          <li><Link to='/medications'>Mi medicación</Link></li>
          <li><Link to='/vitals'>Mis constantes vitales</Link></li>
          <li>Mis citas médicas</li>
        </ul>
      </nav>
      <div className='dashboard-content'>
        <Calendar/>
        <Weather/>
      </div>
    </div>
  );
};

export default Dashboard;