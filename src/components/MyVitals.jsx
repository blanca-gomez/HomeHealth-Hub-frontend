import React, { useState, useEffect } from 'react';
import { Link, Outlet} from 'react-router-dom';
import { useUser } from './UserContext';
import { useVital } from '../contexts/VitalsContext';

const MyVitals = () => {
  const {vitals, updateVitalsList} = useVital();
  const {token} = useUser();
  
  useEffect(() => {
    const fetchVitals = async () => {
      try {
        const response = await fetch('http://localhost:3000/vitals', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          updateVitalsList(data); 
    
        } else {
          throw new Error('Error al obtener las constantes vitales');
        }
      } catch (error) {
        console.error(error);
        
      }
    };

    fetchVitals();
  }, [token, updateVitalsList]); 

  const deleteVital = async (id) => {
    try{
        const response = await fetch(`http://localhost:3000/vitals/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        if(!response.ok){
            throw new Error('Error al eliminar las constantes vitales');
        }
        updateVitalsList(vitals.filter(vital => vital._id!==id))
    }catch (error) {
        console.error(error);
    }
  }
  return (
    <div>
        <nav>
            <ul>
                <li><Link to='/vitals/add'>Añadir constantes vitales</Link></li>
            </ul>
        </nav>
        <Outlet/>
        <h2>Mis constantes vitales</h2>
        <ul>
            {vitals.length > 0 ? (
            vitals.map(vital => (
                <li key={vital._id}>
                {`
                    TA(sistólica): ${vital.systolic},
                    TA(diastólica): ${vital.diastolic},
                    Frecuencia Cardiaca: ${vital.heartReate}, 
                    Saturación de Oxígeno: ${vital.oxygenSaturation}, 
                    Temperatura: ${vital.temperature}, 
                    Glucemia: ${vital.glycemia || 'N/A'}, 
                    Comentarios: ${vital.comments || 'N/A'}
                `}
                <button onClick={() => deleteVital(vital._id)}>Eliminar</button>
                </li>
            ))
            ) : (
            <p>No hay constantes vitales disponibles.</p>
            )}
      </ul>
    </div>
  );
};

export default MyVitals;