// src/themes.js

import { createTheme } from '@mui/material/styles';
import lightBackground from './images/bg-light.png';
import darkBackground from './images/bg-dark.png';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
        default: `url(${lightBackground})`,
        paper: 'rgba(255, 255, 255, 0.2)', // Optional: semi-transparent paper color
        },
    },
    components: {
        MuiCssBaseline: {
        styleOverrides: `
            body {
            background-image: url(${lightBackground});
            background-size: cover;
            background-repeat: no-repeat;
            },
            .weather-card-temp{
                color: rgba(108, 64, 181, 1);
                font-size: 90px;
                margin: 0;
            }
        `,
        },
    },
});

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
        default: `url(${darkBackground})`,
        paper: 'rgba(26, 26, 26, 0.3)', // Optional: semi-transparent paper color
        },
    },
    components: {
        MuiCssBaseline: {
        styleOverrides: `
            body {
            background-image: url(${darkBackground});
            background-size: cover;
            background-repeat: no-repeat;
            },
            .weather-card-temp{
                color: #FFFF99;
                font-size: 90px;
                margin: 0;
            }
        `,
        },
    },
});
