import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import MultiSelect from './MultiSelect/MultiSelect';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

function App() {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [currentSelection, setCurrentSelection] = useState([]);

  const PRODUCT_CATEGORY_OPTIONS = [
    { label: t('inventory.Cabinets'), id: 'CAB' },
    { label: t('inventory.Power'), id: 'POW0' },
    { label: t('inventory.Power'), id: 'POW1' },
    { label: t('inventory.Power'), id: 'POW2' },
    { label: t('inventory.Power'), id: 'POW3' },
    { label: t('inventory.Power'), id: 'POW4' },
    { label: t('inventory.Cages'), id: 'CAG' },
    { label: t('inventory.Offices'), id: 'OFC' },
    { label: t('inventory.RemoteHand'), id: 'RMH' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={8}>
          <MultiSelect
            label="Products"
            currentSelection={currentSelection}
            setCurrentSelection={setCurrentSelection}
            options={PRODUCT_CATEGORY_OPTIONS}
            extraStyles={{
              minWidth: '300px',
            }}
          />
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
