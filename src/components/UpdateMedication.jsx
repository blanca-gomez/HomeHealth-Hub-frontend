import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';
import {Font} from '@react-email/font';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

const UpdateMedication = () => {
    const {id} = useParams();
    const {token} = useUser();
    const [medication, setMedications] = useState({
        medicationName: '',
        description: '',
        dosage: '',
        frequency: '',
        timeOfDay: '',
        day: ''
    });
    const {medications, updateMedicationsList} = useMedication();
    const navigate = useNavigate();

    useEffect (() => {
        const fetchMedication = async () => {
            try{
                const response= await fetch (`http://localhost:3000/medications/${id}`, {
                    headers:{
                        'Authorization' : `Bearer ${token}` 
                    }
                });
                if(response.ok){
                    const data = await response.json();
                    setMedications(data)
                }else{
                    throw new Error ('Error al obtener el medicamento')
                }
            }catch (error){
                console.error(error)
            }
        };
        fetchMedication();
    }, [id, token])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch (`http://localhost:3000/medications/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(medication)
            });
            if(response.ok){
                const updatedMedication = await response.json();
                updateMedicationsList(medications.map(medication => 
                    medication._id === id? updatedMedication : medication
                ));
                navigate('/medications')
            }else{
                throw new Error ('Error al obtener el medicamento')
            }
        }catch (error){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target
        setMedications(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return(
        <div className="register-container">
            <div>
                <h2 ><Font fontFamily="Roboto"/>Editar<FontAwesomeIcon icon={faPills} /></h2>
            </div>
            <nav className='nav-options'>
                <ul>
                    <li><Link to='/dashboard'>Usuario</Link></li>
                    <li><Link to='/medications'>Mi medicación</Link></li>
                    <li><Link to='/vitals'>Mis constantes vitales</Link></li>
                    <li>Mis citas médicas</li>
                </ul>
            </nav> 
            <form onSubmit={handleSubmit} className="register-form">
                <label>Nombre:</label>
                <input type="text" value={medication.medicationName} name="medicationName" onChange={handleChange} />
                <label>Descripción:</label>
                <input type="text" value={medication.description} name="description" onChange={handleChange} />
                <label>Dosis:</label>
                <input type="text" value={medication.dosage} name="dosage" onChange={handleChange} />
                <label>Frecuencia:</label>
                <input type="text" value={medication.frequency} name="frequency" onChange={handleChange} />
                <label>Toma:</label>
                <input type="text" value={medication.timeOfDay} name="timeOfDay" onChange={handleChange} />
                <label>Día:</label>
                <input type="text" value={medication.day} name="day" onChange={handleChange}   />
                <button type="submit" className="submit-buttons">Editar</button>
            </form>
        </div>
    );
};

export default UpdateMedication;