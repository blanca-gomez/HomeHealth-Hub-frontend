import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';
import {Font} from '@react-email/font' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

const MedicationForm = () => {
    const { medications, updateMedicationsList } = useMedication();
    const [newMedication, setNewMedication] = useState({
        medicationName: '',
        description: '',
        dosage: '',
        frequency: '',
        timeOfDay: '',
        day: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { token } = useUser();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNewMedication(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/medications', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(newMedication),
            });
      
            if (response.ok) {
                const result = await response.json();
                console.log(result);

                updateMedicationsList([...medications, result.medication]);

                setMessage('Medicamento añadido correctamente');
                navigate('/medications');
            } else {
                setMessage('Error al añadir medicamento');
            }
        } catch (error) {
            setMessage(error.message || 'Error al añadir medicamento');
        }
    };

    return (
        <div className="register-container">
            <div>
                <h2 ><Font fontFamily="Roboto"/>Nuevo medicamento<FontAwesomeIcon icon={faPills} /></h2>
            </div>
            <nav className='nav-options'>
                <ul>
                    <li><Link to='/dashboard'>Usuario</Link></li>
                    <li><Link to='/medications'>Mi medicación</Link></li>
                    <li><Link to='/vitals'>Mis constantes vitales</Link></li>
                    <li><Link to='/appoinments'>Mis citas médicas</Link></li>
                </ul>
            </nav> 
            <form onSubmit={handleSubmit} className="register-form">
                <label>Nombre:</label>
                <input type="text" value={newMedication.medicationName} name="medicationName" onChange={handleInput} />
                <label>Descripción:</label>
                <input type="text" value={newMedication.description} name="description" onChange={handleInput} />
                <label>Dosis:</label>
                <input type="text" value={newMedication.dosage} name="dosage" onChange={handleInput} />
                <label>Frecuencia:</label>
                <input type="text" value={newMedication.frequency} name="frequency" onChange={handleInput} />
                <label>Toma:</label>
                <input type="text" value={newMedication.timeOfDay} name="timeOfDay" onChange={handleInput} placeholder='DE-CO-ME-CE' />
                <label>Día:</label>
                <input type="text" value={newMedication.day} name="day" onChange={handleInput} placeholder='L-M-X-J-V-S-D'  />
                <button type="submit" className="submit-buttons">Añadir</button>
            </form>
        </div>
    );
};

export default MedicationForm;