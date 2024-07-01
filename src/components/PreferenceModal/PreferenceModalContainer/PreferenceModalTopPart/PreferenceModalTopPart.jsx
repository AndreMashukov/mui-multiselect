import { Stack, Typography } from "@mui/material";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import StoreIcon from "@mui/icons-material/Store";

export const PreferenceModalTopPart = ({
  selectedCountry,
  setSelectedCountry,
  selectedCompany,
  setSelectedCompany,
}) => {
  return (
    <Stack direction="column" justifyContent="flex-start" sx={{ mt: 1 }}>
      <CustomSelect
        value={selectedCountry}
        handleChange={setSelectedCountry}
        options={[
          { id: "1", label: "Country 1" },
          { id: "2", label: "Country 2" },
        ]}
        sx={{ width: "100%" }}
        icon={<LocationOnOutlinedIcon />}
      />
      <CustomSelect
        value={selectedCompany}
        handleChange={setSelectedCompany}
        options={[
          { id: "1", label: "Company 1" },
          { id: "2", label: "Company 2" },
        ]}
        sx={{ width: "100%", mt: 1 }}
        icon={<StoreIcon />}
      />
    </Stack>
  );
};
