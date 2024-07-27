import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useVital } from '../contexts/VitalsContext';
import {Font} from '@react-email/font';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import { BiTrash } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';

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
    <div className='Mymedication-container'>
      <div className='header-container'>
        <div className='title-button-container'>
          <h2><Font fontFamily="Roboto"/><FontAwesomeIcon icon={faHeart} />Mis Constantes vitales<FontAwesomeIcon icon={faHeart} /></h2>
        </div>
        <button className='submit-buttons'><Link to='/vitals/add'>Añadir constante vital</Link></button>
      </div>
      <nav className='nav-options'>
        <ul>
          <li><Link to='/dashboard'>Usuario</Link></li>
          <li><Link to='/medications'>Mi medicación</Link></li>
          <li>Mis citas médicas</li>
        </ul>
      </nav> 
      <div className='medication-container'>
      <ul>
        {vitals.length > 0 ? (
        vitals.map(vital => (
            <li key={vital._id} className='medication-cards'>
              <div className='medication-info'>
                <p><strong>TAS:</strong> {vital.systolic}</p>
                <p><strong>TAD:</strong> {vital.diastolic}</p>
                <p><strong>FC:</strong> {vital.heartReate} lpm</p>
                <p><strong>SatO2:</strong> {vital.oxygenSaturation}%</p>
                <p><strong>Tº:</strong> {vital.temperature}</p>
                <p><strong>BMT:</strong> {vital.glycemia || '-'} mgdl</p>
                <p><strong>Comentarios:</strong> {vital.comments || '-'}</p>
                <button onClick={() => deleteVital(vital._id)}><BiTrash className='bitrash-icon'/></button>
                <button><FaEdit className='faedit-icon'/></button>
              </div>
            </li>
        ))
        ) : (
        <p>No hay constantes vitales disponibles.</p>
        )}
      </ul>
    </div>
        
        
        
  </div>
  );
};


export default MyVitals;