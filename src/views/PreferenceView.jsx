import { Button, Grid } from "@mui/material";
import { useState } from "react";
import PreferenceModal from "../components/PreferenceModal/PreferenceModal";

export const PreferenceView = () => {
  const [showHideColumnsModal, setShowHideColumnsModal] = useState(false);
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
          onClick={() => setShowHideColumnsModal(true)}
          variant="contained"
          color="primary"
        >
          Open
        </Button>
      </Grid>
      {showHideColumnsModal && (
        <PreferenceModal
          showHideColumnsModal={showHideColumnsModal}
          setShowHideColumnsModal={setShowHideColumnsModal}
        />
      )}
    </>
  );
};
