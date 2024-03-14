import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { MultiSelectTestView } from './views/MultiSelectTestView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={8}>
          <MultiSelectTestView />
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
