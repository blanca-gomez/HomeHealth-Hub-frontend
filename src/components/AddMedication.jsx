import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';

const AddMedication = () => {
    const { medications, updateMedicationsList } = useMedication();
    const [newMedication, setNewMedication] = useState({
        medicationName: '',
        description: '',
        dosage: '',
        frequency: '',
        timeOfDay: '',
        endDate: ''
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

                // Aquí actualizamos la lista de medicamentos
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
        <div>
            <h2>Añadir medicamento</h2>
            <form onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input type="text" value={newMedication.medicationName} name="medicationName" onChange={handleInput} />
                <label>Descripción:</label>
                <input type="text" value={newMedication.description} name="description" onChange={handleInput} />
                <label>Dosis:</label>
                <input type="text" value={newMedication.dosage} name="dosage" onChange={handleInput} />
                <label>Frecuencia:</label>
                <input type="text" value={newMedication.frequency} name="frequency" onChange={handleInput} />
                <label>Hora:</label>
                <input type="text" value={newMedication.timeOfDay} name="timeOfDay" onChange={handleInput} />
                <label>Fin:</label>
                <input type="date" value={newMedication.endDate} name="endDate" onChange={handleInput} />
                <button type="submit">Añadir</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddMedication;