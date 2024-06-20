import React, { useState } from 'react';
import './Weather.css';
import axios from "axios";

import { FaWind } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import Modal from '../modals/Modal';
import Modal1 from '../modals/Modal1';
import Modal2 from '../modals/Modal2';
const apiKey = '36e5ea441de6a9d5ffaa56c6bb53b2ff';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function Weather() {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [openModal,setOpenModal]=useState(false);
    const [oModal1,setoModal1]=useState(false);
    const [oModal2,setoModal2]=useState(false);

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
            setWeatherData(response.data);
        } catch (error) {
            console.log('Error', error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    };

    // Move these inside the component function
    let iconUrl = null;
    if (weatherData) {
        const iconCode = weatherData.weather[0].icon;
        iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    return (<>
        <div className='weather-container'>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    className='locationInput'
                    placeholder='Enter city name here'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button id='searchButton'>🔍</button>
            </form>
              {weatherData && (
                <div className='weather-info'>
                    <img className='weather-icon' src={iconUrl} alt="Weather Icon" />
                    <h2 className='location'>{weatherData.name}</h2>
                    <p className='temperature'>{Math.round(weatherData.main.temp)}°C</p>
                    
                    <div className='description-Humidity-Wind'>
                        <div id='d' onClick={()=>{setoModal2(true)}}>
                            <FaCloud /></div>
                        <div id='d'  onClick={()=>{setOpenModal(true)}}><WiHumidity /></div>
                        <div id='d'
                         onClick={()=>{setoModal1(true)}}className='openModalBtn'><FaWind /></div>

                        
                    </div>

                 </div>
                 
             )}

            

              
            
        </div>
        {weatherData && (<div className='h'>
        {openModal ? <Modal  closeModal={setOpenModal} Humidity={weatherData.main.humidity}/>:null}
        </div>)}

        {weatherData && (<div className='w'>
        {oModal1 ? <Modal1  cModal1={setoModal1} Wind={weatherData.wind.speed}/>:null}
        </div>)}

        {weatherData && (<div className='d'>
            {oModal2 ? <Modal2 cModal2 ={setoModal2} Desc ={weatherData.weather[0].description}/>:null}
        </div>)}

        
        
        </>
    );
}

export default Weather;