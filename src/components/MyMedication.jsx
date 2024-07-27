import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';
import {Font} from '@react-email/font';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTablets} from '@fortawesome/free-solid-svg-icons';
import { BiTrash } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';

const MyMedication = () => {
  const {medications, updateMedicationsList} = useMedication();
  const {token} = useUser();
  
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const response = await fetch('http://localhost:3000/medications', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          updateMedicationsList(data); 
    
        } else {
          throw new Error('Error al obtener medicamentos');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMedications();
  }, [token, updateMedicationsList]); 

  const deleteMedication = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/medications/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        if(!response.ok){
            throw new Error('Error al eliminar el medicamento');
        }
        updateMedicationsList(medications.filter(medication => medication._id!==id))
    }catch (error) {
        console.error(error);
    }
  }
  
  return (
    <div className='Mymedication-container'>
      <div className='header-container'>
        <div className='title-button-container'>
          <h2><Font fontFamily="Roboto"/><FontAwesomeIcon icon={faTablets} />Mis Medicamentos<FontAwesomeIcon icon={faTablets} /></h2>
        </div>
        <button className='submit-buttons'><Link to='/medication/add'>Añadir medicamento</Link></button>
      </div>
      <nav className='nav-options'>
        <ul>
          <li><Link to='/dashboard'>Usuario</Link></li>
          <li><Link to='/vitals'>Mis constantes vitales</Link></li>
          <li>Mis citas médicas</li>
        </ul>
      </nav>  
    <div className='medication-container'>
      <ul>
        {medications.length > 0 ? (
          medications.map(medication => (
            <li key={medication._id} className='medication-cards'>
              <div className='medication-info'>
                <h3>{medication.medicationName}</h3>
                <p><strong>Descripción:</strong> {medication.description}</p>
                <p><strong>Dosificación:</strong> {medication.dosage}</p>
                <p><strong>Frecuencia:</strong> {medication.frequency}</p>
                <p><strong>Toma:</strong> {medication.timeOfDay}</p>
                <p><strong>Día:</strong> {medication.day}</p>
                <button onClick={() => deleteMedication(medication._id)}><BiTrash className='bitrash-icon'/></button>
                <Link to={`/medication/edit/${medication._id}`} className='edit-link'>
                  <FaEdit className='faedit-icon'/>
                </Link>

              </div>
            </li>
          ))
      ) : (
        <p>No hay medicamentos disponibles.</p>
      )}
    </ul>
      </div>
    </div>
  );
};

export default MyMedication;