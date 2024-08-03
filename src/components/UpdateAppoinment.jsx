import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useAppoinments } from '../contexts/AppoinmentContext';
import {Font} from '@react-email/font';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPills } from '@fortawesome/free-solid-svg-icons';

const UpdateAppointment = () => {
    const {id} = useParams();
    const {token} = useUser();
    const [appoinment, setAppoinments] = useState({
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
    });
    const {appoinments, updateAppoinmentsList} = useAppoinments();
    const navigate = useNavigate();

    useEffect (() => {
        const fetchAppoinment = async () => {
            try{
                const response= await fetch (`http://localhost:3000/appoinments/${id}`, {
                    headers:{
                        'Authorization' : `Bearer ${token}` 
                    }
                });
                if(response.ok){
                    const data = await response.json();
                    setAppoinments(data)
                }else{
                    throw new Error ('Error al obtener el medicamento')
                }
            }catch (error){
                console.error(error)
            }
        };
        fetchAppoinment();
    }, [id, token])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch (`http://localhost:3000/appoinments/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(appoinment)
            });
            if(response.ok){
                const updatedAppoinment = await response.json();
                updateAppoinmentsList(appoinments.map(appoinment => 
                    appoinment._id === id? updatedAppoinment : appoinment
                ));
                navigate('/appoinments')
            }else{
                throw new Error ('Error al obtener la cita')
            }
        }catch (error){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target
        setAppoinments(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0]
    }

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
                    <li><Link to='/appoinments'>Mis citas médicas</Link></li>
                </ul>
            </nav> 
            <form onSubmit={handleSubmit} className="register-form">
            <label>Día:</label>
                <input type="Date" value={ appoinment.appointmentDate ? formatDate(appoinment.appointmentDate): ''} name="appointmentDate" onChange={handleChange} placeholder='Día'/>
                <label>Hora:</label>
                <input type="Hour" value={appoinment.appointmentTime} name="appointmentTime" onChange={handleChange} placeholder='Hora' />
                <label>Nota:</label>
                <input type="text" value={appoinment.notes} name="notes" onChange={handleChange} placeholder='Notas' />
                <button type="submit" className="submit-buttons">Editar</button>
            </form>
        </div>
    );
};

export default UpdateAppointment;