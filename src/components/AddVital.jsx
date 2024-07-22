import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { useVital } from '../contexts/VitalsContext';

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
                navigate('/dashboard');
            } else {
                setMessage('Error al añadir constante vital');
            }
        } catch (error) {
            setMessage(error.message || 'Error al añadir constante vital');
        }
    };

    return (
        <div>
            <h2>Añadir constantes vitales</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Añadir</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddVital;