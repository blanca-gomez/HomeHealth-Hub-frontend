import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';

const Calendar = () => {
    const {medications, updateMedicationsList} = useMedication();
    const {token} = useUser();
    
    useEffect(() => {
        const fetchMedications = async () => {
        try {
            const response = await fetch(`${import.meta.env.BASE_URL}/appoinments/vitals/medications`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });

            if (response.ok) {
            const data = await response.json();
            updateMedicationsList(data); 
        
            } else {
            throw new Error('Error al obtener medicamentos');
            }
        } catch (error) {
            console.error(error);
        }
        };

        fetchMedications();
    }, [token, updateMedicationsList]); 

    const hours = ['DE', 'CO', 'ME', 'CE', '23H'];
    const days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    const getTimeAndDay = (time, day) => {
        return medications.filter(medication =>
            medication.timeOfDay.split('-').includes(time) && medication.day.split('-').includes(day)
        )
    }

    return(
        <div className='calendar-container'>
            <table className='calendar-table'>
                <thead>
                    <tr>
                        <th>Horas</th>
                        {days.map(day=>(
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map(hour => (
                            <tr key={hour}>
                                <td>{hour}</td>
                                {days.map(day => (
                                    <td key={day}>
                                        {getTimeAndDay(hour, day).map(medication => (
                                            <div key={medication._id}>
                                                {medication.medicationName}
                                            </div>
                                        ))}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default Calendar;