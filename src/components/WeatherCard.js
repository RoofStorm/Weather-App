import React, { useEffect, useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import './WeatherCard.css';

const WeatherCard = ({ data, isLoading  }) => {
    const [classWeather, setClassWeather] = useState('')

    useEffect(()=>{
        if(data?.description.includes('rain')) setClassWeather('rain-card') // display image cloud when description contain rain
        else setClassWeather('sun-card') // display image sun
    },[data?.description])

    return (
        <Card className={`weather-card ${classWeather}`} style={{ marginTop: '20px', padding: '20px 60px',  borderRadius:"20px"}}>
        {/* Add Loading */}
        {isLoading ? <CircularProgress/> :
            <>
            <Typography variant="h6">Today's Weather</Typography>
            <Typography variant='h1' class="weather-card-temp" sx={{ margin:0, fontSize:"90px"}}>
                {data?.temperature}
            </Typography>
            <Typography variant='body2' fontWeight="bold">H: {data?.temp_max} L: {data?.temp_min}</Typography>
            <Box display="flex"
                justifyContent="space-between"
                >
            <Typography variant="body1">{data.city}</Typography>
            <Typography variant="body1">{data.time}</Typography>
            <Typography variant="body1">Humidity: {data.humidity}</Typography>
            <Typography variant="body1">{data.description}</Typography>
            </Box>
            </>
        }
        </Card>
    );
};

export default WeatherCard;
