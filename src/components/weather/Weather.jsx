import React, { useState, useEffect } from 'react';
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
    const [loading, setLoading] = useState(false);
    const [activeModal, setActiveModal] = useState(null); // This will track the active modal

    const fetchWeatherData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
            setWeatherData(response.data);

            // After data is fetched, wait for 2 seconds before hiding the loading screen
            setTimeout(() => {
                setLoading(false);
            }, 2000);
        } catch (error) {
            console.log('Error', error);
            setLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchWeatherData();
    };

    let iconUrl = null;
    if (weatherData) {
        const iconCode = weatherData.weather[0].icon;
        iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }

    // Using if-else for rendering
    let content;
    if (loading) {
        content = (
            <div className='loading-screen'>
                <div className="square-container">
                    <div className="square"></div>
                     <div className="square"></div>
                     <div className="square"></div>
                    </div>
            </div>
        );
    } else if (!loading && weatherData) {
        content = (
            <div className='weather-info'>
                <img className='weather-icon' src={iconUrl} alt="Weather Icon" />
                <h2 className='location'>{weatherData.name}</h2>
                <p className='temperature'>{Math.round(weatherData.main.temp)}°C</p>

                <div className='description-Humidity-Wind'>
                    <div id='d' onClick={() => { setActiveModal('description') }}>
                        <FaCloud />
                    </div>
                    <div id='d' onClick={() => { setActiveModal('humidity') }}>
                        <WiHumidity />
                    </div>
                    <div id='d' onClick={() => { setActiveModal('wind') }}>
                        <FaWind />
                    </div>
                </div>
            </div>
        );
    }

    // Determine which modal to render based on the active modal
    let modalContent = null;
    if (activeModal === 'description') {
        modalContent = (
            <div className='d'>
                <Modal2 cModal2={() => setActiveModal(null)} Desc={weatherData.weather[0].description} />
            </div>
        );
    } else if (activeModal === 'humidity') {
        modalContent = (
            <div className='h'>
                <Modal closeModal={() => setActiveModal(null)} Humidity={weatherData.main.humidity} />
            </div>
        );
    } else if (activeModal === 'wind') {
        modalContent = (
            <div className='w'>
                <Modal1 cModal1={() => setActiveModal(null)} Wind={weatherData.wind.speed} />
            </div>
        );
    }

    return (
        <>
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

                {/* Render content based on the loading state */}
                {content}
            </div>

            {/* Render modals if applicable */}
            <div className='details-modal'>
                {modalContent}
            </div>
        </>
    );
}

export default Weather;
