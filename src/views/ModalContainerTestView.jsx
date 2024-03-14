import { Button, Grid } from "@mui/material"
import { useState } from "react"
import ModalContainer from "../components/ModalContainer/ModalContainer";

export const ModalContainerTestView = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => {
        setOpen(true);
      }}>
        Open
      </Button>
      {open && (
        <ModalContainer
          open={open}
          setOpen={setOpen}
          title="Title"
        >
          <Grid container sx={{ width: "300px" }}>
            Text
          </Grid>
          <Grid container>
            Text
          </Grid>
        </ModalContainer>
      )}
    </>
  )
}