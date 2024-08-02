import React from 'react';
import { useUser} from './UserContext';
import {Font} from '@react-email/font';
import { Link } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';

const User = () => {
    const { user } = useUser();

    return(
        <div className='hellow-user'>
            <div className='dashboard-header'>
                {user ? (
                    <h2><Font fontFamily="Roboto"/>{user.firstName}</h2>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
            <nav className='nav-options'>
                <ul>
                <li><Link to='/medications'>Mi medicación</Link></li>
                <li><Link to='/vitals'>Mis constantes vitales</Link></li>
                <li><Link to='/appoinments'>Mis citas médicas</Link></li>
                </ul>
            </nav>
            <div className='icon-user-perfil'>
                <FaUser/>
            </div>
            <div className='user-perfil-content'>
                <p>Nombre: {user.firstName}</p>
                <p>Apellido: {user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Alergias: {user.allergies}</p>
                <p>Antecedentes médicos: {user.medicalHistory}</p>
            </div>
        </div>
    )
}

export default User;