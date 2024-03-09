import { createTheme } from '@mui/material/styles';

const COLORS = {
  flushOrange: '#ff7a00',
  navyBlue: '#010028',
  blue: '#050283',
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.flushOrange,
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: COLORS.navyBlue,
      light: COLORS.blue,
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F', // Pigment Indigo
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          color: 'white',
          fontWeight: 'bold',
          backgroundColor: COLORS.flushOrange,
        },
        outlined: {
          color: COLORS.flushOrange,
          border: `2px solid ${COLORS.flushOrange}`,
          fontWeight: 'bold',
          '&:hover': {
            border: '2px solid',
          },
        },
        text: {
          // borderRadius: "2px",
          fontWeight: 'bold',
          border: `2px solid ${COLORS.navyBlue}`,
        },
      },
    },
  },
});

export default theme;
