import React from 'react';
import { useUser} from './UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useUser();

  return (
    <div>
      {user ? (
        <h2>¡Bienvenido/a {user.firstName}!</h2>
      ) : (
        <p>Cargando...</p>
      )}
      <nav>
        <ul>
          <li><Link to='/medications'>Mi medicación</Link></li>
          <li><Link to='/vitals'>Mis constantes vitales</Link></li>
          <li>Mis citas médicas</li>
        </ul>
      </nav>
    </div>
    
  );
};

export default Dashboard;