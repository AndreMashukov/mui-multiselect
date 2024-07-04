import { Button, Grid } from "@mui/material";
import { useState } from "react";
import PreferenceModal from "../components/PreferenceModal/PreferenceModal";
import useGetDevice from "../hooks/useGetDevice";

export const PreferenceView = () => {
  const [showModal, setShowModal] = useState(false);
  const { isMobile } = useGetDevice();
  return (
    <>
      <Grid
        container
        sx={{
          position: "relative",
          right: "-50px",
        }}
      >
        <Button
          onClick={() => setShowModal(true)}
          variant="contained"
          color="primary"
        >
          Open
        </Button>
      </Grid>
      {showModal && (
        <PreferenceModal
          showModal={showModal}
          setShowModal={setShowModal}
          isMobile={isMobile}
          countries={[
            { id: "1", label: "Country 1" },
            { id: "2", label: "Country 2" },
            { id: "global", label: "Global" },
          ]}
          companies={[
            { id: "1", label: "Company 1", countryId: "1" },
            { id: "2", label: "Company 2", countryId: "2" },
          ]}
        />
      )}
    </>
  );
};
