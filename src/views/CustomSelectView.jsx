import { useState } from "react";
import CustomSelect from "../components/CustomSelect/CustomSelect";
import StoreIcon from "@mui/icons-material/Store";

const OPTIONS = [
  { id: "1", label: "Option 1" },
  { id: "2", label: "Option 2" },
];

export const CustomSelectView = () => {
  const [value, setValue] = useState("1");

  return (
    <CustomSelect
      value={value}
      handleChange={(e) => setValue(e.target.value)}
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
