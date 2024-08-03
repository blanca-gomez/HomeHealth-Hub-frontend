import React, {useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useAppoinments } from '../contexts/AppoinmentContext';
import {Font} from '@react-email/font';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiTrash } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const MyAppoinments = () => {
  const {appoinments, updateAppoinmentsList} = useAppoinments();
  const {token} = useUser();
  
  useEffect(() => {
    const fetchAppoinments = async () => {
      try {
        const response = await fetch('http://localhost:3000/appoinments', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          updateAppoinmentsList(data); 
    
        } else {
          throw new Error('Error al obtener las citas');
        }
      } catch (error) {
        console.error(error);
        
      }
    };

    fetchAppoinments();
  }, [token, updateAppoinmentsList]); 

  const deleteAppoinment = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/appoinments/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        if(!response.ok){
            throw new Error('Error al eliminar las citas');
        }
        updateAppoinmentsList(appoinments.filter(appoinment => appoinment._id!==id))
    }catch (error) {
        console.error(error);
    }
  }
  return (
    <div className='Mymedication-container'>
      <div className='header-container'>
        <div className='title-button-container'>
          <h2><Font fontFamily="Roboto"/><FontAwesomeIcon icon={faCalendarCheck} />Mis Citas médicas<FontAwesomeIcon icon={faCalendarCheck} /></h2>
        </div>
        <button className='submit-buttons'><Link to='/appoinments/add'>Añadir cita médica</Link></button>
      </div>
      <nav className='nav-options'>
        <ul>
          <li><Link to='/dashboard'>Usuario</Link></li>
          <li><Link to='/medications'>Mi medicación</Link></li>
          <li><Link to='/appoinments'>Mis citas médicas</Link></li>
        </ul>
      </nav> 
      <div className='medication-container'>
      <ul>
        {appoinments.length > 0 ? (
        appoinments.map(appoinment => (
          appoinment &&  appoinment._id &&(
            <li key={appoinment._id} className='medication-cards'>
              <div className='medication-info'>
                <p><strong>Día:</strong> {appoinment.appointmentDate ? new Date(appoinment.appointmentDate).toLocaleDateString() : 'Fecha no disponible'}</p>
                <p><strong>Hora:</strong> {appoinment.appointmentTime ? appoinment.appointmentTime : 'Fecha no disponible'}</p>
                <p><strong>Notas:</strong> {appoinment.notes}</p>
                <button onClick={() => deleteAppoinment(appoinment._id)}><BiTrash className='bitrash-icon'/></button>
                <Link to={`/appoinments/edit/${appoinment._id}`} className='edit-link'>
                    <FaEdit className='faedit-icon'/>
                  </Link>
              </div>
            </li>
          )
        ))
        ) : (
        <p>No hay citas disponibles.</p>
        )}
      </ul>
    </div>    
  </div>
  );
};


export default MyAppoinments;