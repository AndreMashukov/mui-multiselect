import { useState } from "react";
import CustomSelect from "../components/CustomSelect/CustomSelect";
import StoreIcon from "@mui/icons-material/Store";
import useGetDevice from "../hooks/useGetDevice";

const OPTIONS = [
  { id: "1133", label: "Option 1" },
  { id: "991", label: "Option 2" },
];

export const CustomSelectView = () => {
  const [value, setValue] = useState("1133");
  const {isMobile} = useGetDevice();

  const desktopStyles = {
    color: "white",
    backgroundColor: (theme) => theme.palette.secondary.main,
  };


  return (
    <CustomSelect
      value={value}
      handleChange={setValue}
      options={OPTIONS}
      sx={{
        width: "100%",
        ...(isMobile ? {} : desktopStyles),
      }}
      icon={<StoreIcon />}
      replaceChevron={!isMobile}
      maxCharLength={isMobile ? "35" : "20"}
    />
  );
};
