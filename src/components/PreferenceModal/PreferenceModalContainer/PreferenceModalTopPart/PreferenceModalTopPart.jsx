import { Stack } from "@mui/material";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StoreIcon from "@mui/icons-material/Store";
import { useContext } from "react";
import { PreferenceModalContext } from "../../context/PreferenceModalContext";
import PropTypes from "prop-types";

export const PreferenceModalTopPart = ({ countries, companies }) => {
  const { state, actions } = useContext(PreferenceModalContext);
  const { selectedCountry, selectedCompany } = state;
  const { setSelectedCountry, setSelectedCompany } = actions;
  return (
    <Stack direction="column" justifyContent="flex-start" sx={{ mt: 1 }}>
      <CustomSelect
        value={selectedCountry}
        handleChange={setSelectedCountry}
        options={countries}
        sx={{ width: "100%" }}
        icon={<LocationOnOutlinedIcon />}
      />
      <CustomSelect
        value={selectedCompany}
        handleChange={setSelectedCompany}
        options={companies}
        sx={{ width: "100%", mt: 1 }}
        icon={<StoreIcon />}
      />
    </Stack>
  );
};

PreferenceModalTopPart.propTypes = {
  countries: PropTypes.array.isRequired,
  companies: PropTypes.array.isRequired,
};
