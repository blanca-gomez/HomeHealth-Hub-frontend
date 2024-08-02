import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useVital } from '../contexts/VitalsContext';
import {Font} from '@react-email/font' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';


const AddVital = () => {
    const { vitals, updateVitalsList } = useVital();
    const [newVital, setNewVital] = useState({
        systolic: '',
        diastolic: '',
        heartReate: '',
        oxygenSaturation: '',
        temperature: '',
        glycemia: '',
        comments: '',
    });

   
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { token } = useUser();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNewVital(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/vitals', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(newVital),
            });
      
            if (response.ok) {
                const result = await response.json();
                updateVitalsList([...vitals, result.vital]);
                setMessage('Constante vital añadida correctamente');
                navigate('/vitals');
            } else {
                setMessage('Error al añadir constante vital');
            }
        } catch (error) {
            setMessage(error.message || 'Error al añadir constante vital');
        }
    };

    return (
        <div className="register-container">
            <h2 ><Font fontFamily="Roboto"/>Nueva constante vital<FontAwesomeIcon icon={faHeart} /></h2>
            <nav className='nav-options'>
                <ul>
                    <li><Link to='/dashboard'>Usuario</Link></li>
                    <li><Link to='/medications'>Mi medicación</Link></li>
                    <li><Link to='/vitals'>Mis constantes vitales</Link></li>
                    <li><Link to='/appoinments'>Mis citas médicas</Link></li>
                </ul>
            </nav> 
            <form onSubmit={handleSubmit} className="register-form">
                <label>Tensión arterial:</label>
                <input type="number" value={newVital.systolic} name="systolic" onChange={handleInput} placeholder='Sistólica'/>
                <input type="number" value={newVital.diastolic} name="diastolic" onChange={handleInput} placeholder='Diastólica'/>
                <label>Frecuencia Cardiaca:</label>
                <input type="number" value={newVital.heartReate} name="heartReate" onChange={handleInput} />
                <label>Saturación de oxígeno:</label>
                <input type="number" value={newVital.oxygenSaturation} name="oxygenSaturation" onChange={handleInput} />
                <label>Temperatura:</label>
                <input type="number" value={newVital.temperature} name="temperature" onChange={handleInput} />
                <label>Glucemia:</label>
                <input type="number" value={newVital.glycemia} name="glycemia" onChange={handleInput} />
                <label>Comentarios:</label>
                <input type="text" value={newVital.comments} name="comments" onChange={handleInput} />
                <button type="submit" className="submit-buttons">Añadir</button>
            </form>
        </div>
    );
};

export default AddVital;