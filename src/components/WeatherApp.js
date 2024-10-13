import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import SearchHistory from './SearchHistory';
import { Button, TextField, Container, Card, Alert, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { fetchWeatherData } from '../utils/weatherAPI';
import Grid from '@mui/material/Grid2';
import moment from 'moment';

function WeatherApp() {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(''); // New state for error messages
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (searchCity = city, searchCountry = country) => {
        setIsLoading(true); // Start Loading
        setError(''); // Reset the error state before each search
        try{
            const data = await fetchWeatherData(searchCity, searchCountry);
            if (data) {
                const weatherDetails = {
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
                setWeatherData(null) // Clear WeatherCard if data is null
                setError('Error response'); // Set error message if data is null
            }
        }catch (err) {
            setWeatherData(null)  // Clear WeatherCard if data is not found
            setError('Not found.');// Set error message if data is not found
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
    const handleDeleteHistory = (index) => {
        setHistory(history.filter((_, i) => i !== index));
    };

    
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') { // Search when press enter
        handleSearch();
        }
    };

    return (
        <Container>
            <Card variant="outlined" style={{ marginTop: '20px', padding: '20px',background:"transparent" }}>
                <Grid container spacing={2} justifyContent="center" alignItems="center" >
                <Grid item xs={5}>
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
                <Grid item xs={5}>
                    <TextField
                        label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        onKeyDown={handleKeyPress}
                        fullWidth
                        variant="filled"
                        size="small"
                        defaultValue=""
                    />
                </Grid>
                <Grid item xs={2}>
                    <Box
                        display="flex"
                        alignItems="center"
                        gap="10px"
                    >
                        <Button
                        variant="contained"
                        onClick={() => handleSearch()}
                        fullWidth
                        sx={{ background:"rgba(108, 64, 181, 1)", height: "38px", borderRadius: "20px"}}
                        >
                        <SearchIcon sx={{height: "30px", width:"30px"}} />
                        </Button>
                        <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleClear}
                        fullWidth
                        >
                        Clear
                        </Button>
                    </Box>
                </Grid>
                </Grid>

                {error && <Alert severity="error" style={{ marginTop: '10px' }}>{error}</Alert>} {/* Display error message */}
                
                {weatherData && <WeatherCard data={weatherData} isLoading={isLoading} />} {/* show weather data searching */}

                {/* show search list */}
                {history.length > 0 && (        
                    <SearchHistory 
                        history={history} 
                        handleDelete={handleDeleteHistory} 
                        handleSearch={handleSearch}
                    /> 
                )}
                
            </Card>
        </Container>
    );
}

export default WeatherApp;
