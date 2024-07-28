import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useUser } from './UserContext';
import { useVital } from '../contexts/VitalsContext';
import {Font} from '@react-email/font' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';


const Updatevital = () => {
    const {id} = useParams();
    const {token} = useUser();
    const [vital, setVitals] = useState({
        systolic: '',
        diastolic: '',
        heartReate: '',
        oxygenSaturation: '',
        temperature: '',
        glycemia: '',
        comments: '',
    });
    const {vitals, updateVitalsList} = useVital();
    const navigate = useNavigate();

    useEffect (() => {
        const fetchVital = async () => {
            try{
                const response= await fetch (`http://localhost:3000/vitals/${id}`, {
                    headers:{
                        'Authorization' : `Bearer ${token}` 
                    }
                });
                if(response.ok){
                    const data = await response.json();
                    setVitals(data)
                }else{
                    throw new Error ('Error al obtener la constante vital')
                }
            }catch (error){
                console.error(error)
            }
        };
        fetchVital();
    }, [id, token])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch (`http://localhost:3000/vitals/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(vital)
            });
            if(response.ok){
                const updatedVital = await response.json();
                updateVitalsList(vitals.map(vital => 
                    vital._id === id? updatedVital : vital
                ));
                navigate('/vitals')
            }else{
                throw new Error ('Error al obtener la constante vital')
            }
        }catch (error){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target
        setVitals(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="register-container">
            <h2 ><Font fontFamily="Roboto"/>Nueva constante vital<FontAwesomeIcon icon={faHeart} /></h2>
            <nav className='nav-options'>
                <ul>
                    <li><Link to='/dashboard'>Usuario</Link></li>
                    <li><Link to='/medications'>Mi medicación</Link></li>
                    <li><Link to='/vitals'>Mis constantes vitales</Link></li>
                    <li>Mis citas médicas</li>
                </ul>
            </nav> 
            <form onSubmit={handleSubmit} className="register-form">
                <label>Tensión arterial:</label>
                <input type="number" value={vital.systolic} name="systolic" onChange={handleChange} placeholder='Sistólica'/>
                <input type="number" value={vital.diastolic} name="diastolic" onChange={handleChange} placeholder='Diastólica'/>
                <label>Frecuencia Cardiaca:</label>
                <input type="number" value={vital.heartReate} name="heartReate" onChange={handleChange} />
                <label>Saturación de oxígeno:</label>
                <input type="number" value={vital.oxygenSaturation} name="oxygenSaturation" onChange={handleChange} />
                <label>Temperatura:</label>
                <input type="number" value={vital.temperature} name="temperature" onChange={handleChange} />
                <label>Glucemia:</label>
                <input type="number" value={vital.glycemia} name="glycemia" onChange={handleChange} />
                <label>Comentarios:</label>
                <input type="text" value={vital.comments} name="comments" onChange={handleChange} />
                <button type="submit" className="submit-buttons">Añadir</button>
            </form>
        </div>
    );
};
export default Updatevital;