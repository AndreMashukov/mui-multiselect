import {Stack} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StoreIcon from "@mui/icons-material/Store";
import {useContext} from "react";
import {PreferenceModalContext} from "../../context/PreferenceModalContext";
import PropTypes from "prop-types";
import CustomSelect from "../../../CustomSelect/CustomSelect";

export const PreferenceModalTopPart = ({countries, companies}) => {
  const {state, actions} = useContext(PreferenceModalContext);
  const {selectedCountry, selectedCompany} = state;
  const {setSelectedCountry, setSelectedCompany} = actions;

  const getCompaniesFilteredByCountry = () => {
    if (selectedCountry === "global" || !selectedCompany) {
      return companies;
    }
    return companies.filter((company) => company.countryId === selectedCountry);
  };

  return (
    <Stack direction="column" justifyContent="flex-start" sx={{mt: 1}}>
      <CustomSelect
        value={selectedCountry}
        handleChange={setSelectedCountry}
        options={countries}
        sx={{width: "100%"}}
        icon={<LocationOnOutlinedIcon />}
        placeholder="Select Country"
      />
      <CustomSelect
        value={selectedCompany}
        handleChange={setSelectedCompany}
        options={getCompaniesFilteredByCountry()}
        sx={{width: "100%", mt: 1}}
        icon={<StoreIcon />}
        placeholder="Select Company"
      />
    </Stack>
  );
};

PreferenceModalTopPart.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      countryId: PropTypes.string.isRequired,
    })
  ).isRequired,
};
