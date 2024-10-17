import React, { useState, KeyboardEvent } from 'react';
import WeatherCard from './WeatherCard';
import SearchHistory from './SearchHistory';
import { Button, TextField, Container, Card, Alert, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchWeatherData } from '../utils/weatherAPI';
import Grid from '@mui/material/Grid2';
import moment from 'moment';
import './WeatherApp.css';

interface WeatherDetails {
  city: string;
  country: string;
  description: string;
  temperature: string;
  temp_max: string;
  temp_min: string;
  humidity: string;
  time: string;
}

function WeatherApp() {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [weatherData, setWeatherData] = useState<WeatherDetails | null>(null);
  const [history, setHistory] = useState<WeatherDetails[]>([]);
  const [error, setError] = useState<string>(''); // New state for error messages
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (searchCity = city, searchCountry = country) => {
    setIsLoading(true); // Start Loading
    setError(''); // Reset the error state before each search
    try {
      const data = await fetchWeatherData(searchCity, searchCountry);
      if (data) {
        const weatherDetails: WeatherDetails = {
          city: `${data.name}, ${data.sys.country}`,
          country: data.sys.country,
          description: data.weather[0].description,
          temperature: `${Math.floor(data.main.temp)}°C`,
          temp_max: `${Math.floor(data.main.temp_max)}°`,
          temp_min: `${Math.floor(data.main.temp_min)}°`,
          humidity: `${data.main.humidity}%`,
          time: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a'),
        };
        setWeatherData(weatherDetails);

        // Add to history only if it’s a new entry
        if (!history.some((entry) => entry.city === weatherDetails.city)) {
          setHistory([...history, { ...weatherDetails, time: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a') }]);
        }
        // Clear input after searching success
        setCity('');
        setCountry('');
      } else {
        setWeatherData(null); // Clear WeatherCard if data is null
        setError('Error response'); // Set error message if data is null
      }
    } catch (err) {
      setWeatherData(null); // Clear WeatherCard if data is not found
      setError('Not found.'); // Set error message if data is not found
    } finally {
      setIsLoading(false); // End loading
    }
  };

  // Clear all input & search history & WeatherCard
  const handleClear = () => {
    setCity('');
    setCountry('');
    setWeatherData(null);
    setError(''); // Clear the error when clearing inputs
  };

  // Delete single history record
  const handleDeleteHistory = (index: number) => {
    setHistory(history.filter((_, i) => i !== index));
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Search when press enter
      handleSearch();
    }
  };

  return (
    <Container>
      <Card variant="outlined" className='app-card'>
        <Grid container spacing={2} className="app-card-input-group">
          <Grid size={5}>
            <TextField
              label="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress}
              fullWidth
              size="small"
              variant="filled"
            />
          </Grid>
          <Grid size={5}>
            <TextField
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              onKeyDown={handleKeyPress}
              fullWidth
              variant="filled"
              size="small"
            />
          </Grid>
          <Grid size={2}>
            <Box className="app-card-btn-group">
              <Button
                variant="contained"
                onClick={() => handleSearch()}
                fullWidth
                className='btn-search'
              >
                <SearchIcon sx={{ height: '30px', width: '30px' }} />
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleClear} fullWidth>
                Clear
              </Button>
            </Box>
          </Grid>
        </Grid>

        {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>} {/* Display error message */}

        {weatherData && <WeatherCard data={weatherData} isLoading={isLoading} />} {/* show weather data searching */}

        {/* show search list */}
        {history.length > 0 && (
          <SearchHistory history={history} handleDelete={handleDeleteHistory} handleSearch={handleSearch} />
        )}
      </Card>
    </Container>
  );
}

export default WeatherApp;
