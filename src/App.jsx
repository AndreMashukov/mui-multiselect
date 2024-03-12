import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline/CssBaseline';
import MultiSelect from './MultiSelect/MultiSelect';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';

function App() {
  const { t } = useTranslation();
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

  const formik = useFormik({
    initialValues: {
      products: [],
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container>
        <Grid item xs={8}>
        <MultiSelect
            id="products"
            label="Products"
            currentSelection={formik.values.products}
            setCurrentSelection={(value) => {
              formik.setFieldValue('products', value);
            }}
            options={PRODUCT_CATEGORY_OPTIONS}
            extraStyles={{
              minWidth: '300px',
            }}
            setTouched={formik.setTouched}
          />
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
