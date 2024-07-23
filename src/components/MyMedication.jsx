import React, { useState, useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';
import {Font} from '@react-email/font';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTablets} from '@fortawesome/free-solid-svg-icons';

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
    <div className='hellow-user'>
      <div className='header-container'>
        <h2><Font fontFamily="Roboto"/><FontAwesomeIcon icon={faTablets} />Mis Medicamentos<FontAwesomeIcon icon={faTablets} /></h2>
        <button><Link to='/medication/add'>Añadir medicamento</Link></button>
      </div>
      <nav className='nav-options'>
        <ul>
          <li><Link to='/medications'>Mi medicación</Link></li>
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
                <p><strong>Hora del día:</strong> {medication.timeOfDay}</p>
                <p><strong>Fecha de finalización:</strong> {medication.endDate}</p>
                <button onClick={() => deleteMedication(medication._id)}>Eliminar</button>
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