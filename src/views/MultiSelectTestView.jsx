import { useTranslation } from "react-i18next";
import MultiSelect from "../components/MultiSelect/MultiSelect";
import { useFormik } from "formik";

export const MultiSelectTestView = () => {
  const { t } = useTranslation();

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
      setTouched={formik.setFieldTouched}
    />
  )
}