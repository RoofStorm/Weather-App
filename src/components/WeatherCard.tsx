import React, { useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './WeatherCard.css';

interface WeatherData {
  city: string;
  country: string;
  description: string;
  temperature: string;
  temp_max: string;
  temp_min: string;
  humidity: string;
  time: string;
}

interface WeatherCardProps {
  data: WeatherData | null;
  isLoading: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, isLoading }) => {
  const [classWeather, setClassWeather] = useState<string>('');

  useEffect(() => {
    if (data?.description.includes('rain')) {
      setClassWeather('rain-card'); // Display image cloud when description contains rain
    } else {
      setClassWeather('sun-card'); // Display image sun
    }
  }, [data?.description]);

  return (
    <Card className={`weather-card ${classWeather}`}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h6">Today's Weather</Typography>
          <Typography variant="h1" className="weather-card-temp">
            {data?.temperature}
          </Typography>
          <Typography variant="body2" fontWeight="bold">
            H: {data?.temp_max} L: {data?.temp_min}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1">{data?.city}</Typography>
            <Typography variant="body1">{data?.time}</Typography>
            <Typography variant="body1">Humidity: {data?.humidity}</Typography>
            <Typography variant="body1">{data?.description}</Typography>
          </Box>
        </>
      )}
    </Card>
  );
};

export default WeatherCard;
