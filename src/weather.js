import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Weather.css';

function fahrenheitToCelsius(fahrenheit) {
    const celsius = (fahrenheit - 32) * 5 / 9;
    return celsius;
  }
  
const Weather = () => {
  const [city, setCity] = useState('Tel Aviv');
  const [weather, setWeather] = useState({});

  const API_key = '84264889e9d28801656205f42feb4293';

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://api.openweathermap.org/data/2.5/weather?lat=10.34&lon=10.99&appid=${API_key}`);
        console.log(fahrenheitToCelsius(result.data.main.temp))
      setWeather(result.data);
    };

    fetchData();
  }, [city]);

  const handleCityChange = event => {
    setCity(event.target.value);
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <select onChange={handleCityChange} value={city}>
        <option value="Tel Aviv">Tel Aviv</option>
        <option value="Jerusalem">Jerusalem</option>
        <option value="Haifa">Haifa</option>
        <option value="Beer Sheva">Beer Sheva</option>
        <option value="Petah Tikva">Petah Tikva</option>
      </select>

      {weather.name && (
        <div className="weather-details">
          <p>City: {weather.name}</p>
          <p>Temperature: {weather.main.temp}</p>
          <p>Humidity: {weather.main.humidity}</p>
          <p>Description: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
