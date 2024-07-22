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
    <div>
        <nav>
            <ul>
                <li><Link to='/medication/add'>Añadir medicamento</Link></li>
            </ul>
        </nav>
        <Outlet/>
        <h2>Mis Medicamentos</h2>
        <ul>
            {medications.length > 0 ? (
              medications.map(medication => (
                <li key={medication._id}>
                  {`
                    Nombre: ${medication.medicationName},
                    Descripción: ${medication.description},
                    Dosificación: ${medication.dosage},
                    Frecuencia: ${medication.frequency},
                    Hora del día: ${medication.timeOfDay},
                    Fecha de finalización: ${medication.endDate}
                  `}
                  <button onClick={() => deleteMedication(medication._id)}>Eliminar</button>
                </li>
              ))
            ) : (
              <p>No hay medicamentos disponibles.</p>
            )}
        </ul>
    </div>
  );
};

export default MyMedication;