import React, { useState, Suspense } from "react";
import "./Weather.css";
import axios from "axios";

import { FaWind } from "react-icons/fa";
import { FaCloud } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import Modal from "../modals/Modal";
import Modal1 from "../modals/Modal1";
import Modal2 from "../modals/Modal2";

const apiKey = "36e5ea441de6a9d5ffaa56c6bb53b2ff";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
async function fetchWeatherData(city) {
  const response = await axios.get(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
  return response.data;
}

function WeatherDisplay({ city }) {
  const weatherData = use(fetchWeatherData(city)); // Resolve the API data

  const iconCode = weatherData.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const [openModal, setOpenModal] = useState(false);
  const [oModal1, setoModal1] = useState(false);
  const [oModal2, setoModal2] = useState(false);

  return (
    <div className="weather-info">
      <img className="weather-icon" src={iconUrl} alt="Weather Icon" />
      <h2 className="location">{weatherData.name}</h2>
      <p className="temperature">{Math.round(weatherData.main.temp)}°C</p>

      <div className="description-Humidity-Wind">
        <div id="d" onClick={() => setoModal2(true)}>
          <FaCloud />
        </div>
        <div id="d" onClick={() => setOpenModal(true)}>
          <WiHumidity />
        </div>
        <div id="d" onClick={() => setoModal1(true)}>
          <FaWind />
        </div>
      </div>

      <div className="details-modal">
        {oModal2 && (
          <div className="d">
            <Modal2 cModal2={setoModal2} Desc={weatherData.weather[0].description} />
          </div>
        )}

        {openModal && (
          <div className="h">
            <Modal closeModal={setOpenModal} Humidity={weatherData.main.humidity} />
          </div>
        )}

        {oModal1 && (
          <div className="w">
            <Modal1 cModal1={setoModal1} Wind={weatherData.wind.speed} />
          </div>
        )}
      </div>
    </div>
  );
}

function Weather() {
  const [city, setCity] = useState("");
  const [isCitySubmitted, setIsCitySubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCitySubmitted(true); // Trigger the weather display
  };

  return (
    <div className="weather-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="locationInput"
          placeholder="Enter city name here"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setIsCitySubmitted(false); // Reset submission
          }}
        />
        <button id="searchButton">🔍</button>
      </form>

      {isCitySubmitted && (
        <Suspense fallback={<div>Loading weather data...</div>}>
          <WeatherDisplay city={city} />
        </Suspense>
      )}
    </div>
  );
}

export default Weather;
