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
            <Link to='/medications'>Mi medicación</Link>
            <li>Mis constantes vitales</li>
            <li>Mis citas médicas</li>
    
        
      </nav>
    </div>
    
  );
};

export default Dashboard;