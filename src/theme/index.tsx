import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#07142B',
        },
        secondary: {
            main: '#C13C94',
            dark: "#BD4291",
        },
        error: {
            main: '#EF233C'
        },
        info: {
            main: '#6092FF',
            dark: "#004FFF",
        },
        warning: {
            light: '#FF7F50',
            main: '#FF6347',
            dark: '#FF4500'
        },
        success: {
            light: "#61D095",
            main: '#09D17E',
            dark: '#53BF9D',
        },
    },
});

export default theme