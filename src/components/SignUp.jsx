import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { FaUserPlus, FaArrowLeft } from 'react-icons/fa';
import {Font} from '@react-email/font' 

const SignUp = () => {
    const [form, setForm] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password:'',
        age:'',
        allergies:'',
        medicalHistory:'',
        emergencyContacts:''
    })
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setUser, setToken } = useUser();
    

    const handleInput = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try{
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json', 
                },
                body: JSON.stringify(form), 
              })
    
              if(response.ok){
                setMessage('¡Usuario registrado con éxito!');
                setForm({
                    firstName: '',
                    lastName:'',
                    email: '',
                    password:'',
                    age:'',
                    allergies:'',
                    medicalHistory:'',
                    emergencyContacts:''
                })
            
              }else{
                setMessage('Error al registrar el usuario')
    
              }
        }catch (error){
            setMessage(error.message || 'Error al registrar el usuario')
        }
    }

        return(
            <div className="register-container">
                <h2> 
                    <FaUserPlus className="singUpIn-icon" />
                    <Font fontFamily="Roboto"/><p>Registro</p>
                </h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <label>First Name:</label>
                    <input type='text' value={form.firstName} name='firstName' onChange={handleInput}></input>
                    <label>Last Name:</label>
                    <input type='text' value={form.lastName} name='lastName' onChange={handleInput}></input>
                    <label>email:</label>
                    <input type='text' value={form.email} name='email' onChange={handleInput}></input>
                    <label>Password:</label>
                    <input type='password' value={form.password} name='password' onChange={handleInput}></input>
                    <label>Age:</label>
                    <input type='number' value={form.age} name='age' onChange={handleInput}></input>
                    <label>Allergies:</label>
                    <input type='text' value={form.allergies} name='allergies' onChange={handleInput}></input>
                    <label>Medical history:</label>
                    <input type='text' value={form.medicalHistory} name='medicalHistory' onChange={handleInput}></input>
                    <label>Emergency contacts: </label>
                    <input type='text' value={form.emergencyContacts} name='emergencyContacts' onChange={handleInput}></input>
                    <button type='submit' className="submit-buttons">Sign Up</button>
                </form>
                <FaArrowLeft className="arrow-icon" onClick={() => navigate('/')}/>
            </div>
        )
}

export default SignUp;