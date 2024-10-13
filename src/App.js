import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes';
import { AppBar, Toolbar, Typography, Switch, Box, CssBaseline } from '@mui/material';
import WeatherApp from './components/WeatherApp';

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const handleThemeChange = () => {
      setDarkMode(!darkMode);
    };

    return (
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
            <Toolbar sx={{ justifyContent:"flex-end"}} >
              <Typography variant="h4" sx={{ flexGrow: 1 }}>
                  Weather App
                </Typography>
              <Switch checked={darkMode} onChange={handleThemeChange} />
              <Typography variant="body1">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </Typography>
            </Toolbar>
          </AppBar>
          <WeatherApp />
        </Box>
      </ThemeProvider>
    );
}

export default App;
