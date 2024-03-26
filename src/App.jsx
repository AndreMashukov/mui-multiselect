import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { MultiSelectTestView } from './views/MultiSelectTestView';
import { ModalContainerTestView } from './views/ModalContainerTestView';
import { DatepickerView } from './views/DatepickerView';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{position: "relative", top: "-"}}>
        <Grid item xs={10}>
          {/* <MultiSelectTestView /> */}
          {/* <ModalContainerTestView /> */}
          <DatepickerView />
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
