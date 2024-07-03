import { Button, Grid } from "@mui/material";
import { useState } from "react";
import PreferenceModal from "../components/PreferenceModal/PreferenceModal";
import useGetDevice from "../hooks/useGetDevice";

export const PreferenceView = () => {
  const [showModal, setShowModal] = useState(false);
  const { isMobile } = useGetDevice()
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
        />
      )}
    </>
  );
};
