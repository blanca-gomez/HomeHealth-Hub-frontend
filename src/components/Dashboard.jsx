import React from 'react';
import { useUser } from './UserContext';

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
        <li>Mi medicación</li>
        <li>Mis constantes vitales</li>
        <li>Mis citas médicas</li>
      </nav>
    </div>
    
  );
};

export default Dashboard;