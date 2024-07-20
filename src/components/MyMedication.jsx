import React, { useState, useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';

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

  
  return (
    <div>
        <nav>
            <ul>
                <li><Link to='/medication/add'>Añadir medicamento</Link></li>
            </ul>
        </nav>
        <Outlet/>
        <h2>Mis Medicamentos</h2>
        <ul>
            {medications.map(medication => (
                <li key={medication._id}>{medication.medicationName}</li>
            ))}
        </ul>
    </div>
  );
};

export default MyMedication;