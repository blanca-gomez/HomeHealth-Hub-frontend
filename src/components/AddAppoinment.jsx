import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useAppoinments } from '../contexts/AppoinmentContext';
import {Font} from '@react-email/font' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';



const AddAppoinment = () => {
    const { appoinments, updateAppoinmentsList } = useAppoinments();
    const [newAppoinment, setNewAppoinment] = useState({
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
    });

   
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { token } = useUser();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNewAppoinment(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/appoinments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(newAppoinment),
            });
      
            if (response.ok) {
                const result = await response.json();
                updateAppoinmentsList([...appoinments, result.appoinment]);
                setMessage('Cita añadida correctamente');
                navigate('/appoinments');
            } else {
                setMessage('Error al añadir la cita');
            }
        } catch (error) {
            setMessage(error.message || 'Error al añadir la cita');
        }
    };

    return (
        <div className="register-container">
            <h2 ><Font fontFamily="Roboto"/>Nueva constante vital<FontAwesomeIcon icon={faCalendarCheck} /></h2>
            <nav className='nav-options'>
                <ul>
                    <li><Link to='/dashboard'>Usuario</Link></li>
                    <li><Link to='/medications'>Mi medicación</Link></li>
                    <li><Link to='/vitals'>Mis constantes vitales</Link></li>
                    <li><Link to='/appoinments'>Mis citas médicas</Link></li>
                </ul>
            </nav> 
            <form onSubmit={handleSubmit} className="register-form">
                <label>Día:</label>
                <input type="Date" value={newAppoinment.appointmentDate} name="appointmentDate" onChange={handleInput} placeholder='Día'/>
                <label>Hora:</label>
                <input type="Hour" value={newAppoinment.appointmentTime} name="appointmentTime" onChange={handleInput} placeholder='Hora' />
                <label>Nota:</label>
                <input type="text" value={newAppoinment.notes} name="notes" onChange={handleInput} placeholder='Notas' />
                <button type="submit" className="submit-buttons">Añadir</button>
            </form>
        </div>
    );
};

export default AddAppoinment;
