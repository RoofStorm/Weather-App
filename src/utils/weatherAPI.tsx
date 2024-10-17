// src/utils/weatherAPI.ts
import axios from 'axios';

const API_KEY = '0f8f6b9da85355cbf4571a3a5720c46c'; // OpenWeather API key

interface WeatherAPIResponse {
  name: string;
  sys: {
    country: string;
  };
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
}

export const fetchWeatherData = async (city: string, country: string): Promise<WeatherAPIResponse | null> => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get<WeatherAPIResponse>(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching:', error);
    return null;
  }
};
