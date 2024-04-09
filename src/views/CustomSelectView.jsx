import { useState } from "react";
import CustomSelect from "../components/CustomSelect/CustomSelect";
import StoreIcon from "@mui/icons-material/Store";

const OPTIONS = [
  { id: 1133, label: "Option 1" },
  { id: 991, label: "Option 2" },
];

export const CustomSelectView = () => {
  const [value, setValue] = useState(1133);

  return (
    <CustomSelect
      value={value}
      handleChange={setValue}
      options={OPTIONS}
      icon={<StoreIcon />}
      replaceChevron
      sx={{
        width: "100%",
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: "white",
        borderColor: "white",
      }}
    />
  );
};
