// src/utils/weatherAPI.js
import axios from 'axios';

const API_KEY = '0f8f6b9da85355cbf4571a3a5720c46c'; // OpenWeather API key

export const fetchWeatherData = async (city, country) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching:", error);
        return null;
    }
};
