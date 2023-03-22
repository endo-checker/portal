import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';

// import { components } from './components';
import { palette } from './palette';
import { typography } from './typography';

export const theme: Theme = responsiveFontSizes(createTheme({
    palette,
    typography,
}));
