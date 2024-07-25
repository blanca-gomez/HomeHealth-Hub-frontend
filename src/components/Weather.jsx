import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import { useMedication } from '../contexts/MedicationContexts';

const Weather = () => {
    const [location, setLocation] = useState('');
    const [weatherCondition, setWeatherCondition] = useState('');
    const [temperature, setTemperature] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');

    useEffect(() => {
        fetch('https://api.weatherapi.com/v1/forecast.json?key=5cbee4031ed04e448d0174150240304&q=Madrid&aqi=no')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then((data) => {
                const {location, current} = data
                setLocation(`${location.name}/${location.country}`);
                setWeatherCondition(current.condition.text)
                setTemperature(`${current.temp_c}ºC`)
                setWeatherIcon(`https:${current.condition.icon}`)
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []); 

    return(
        <div className='weather-container'>
            <div className='weather-location'>
                {location}
            </div>
            <div className='weather-content'>
                <p>{weatherCondition}</p>
                <img src={weatherIcon} alt={weatherCondition} className='weather-icon'></img>
            </div>
            <div className='weather-temperature'>
                <p>{temperature}</p>
            </div>
        </div>
    )
}

export default Weather;