import { Button, Grid } from "@mui/material";
import ModalContainer from "../components/ModalContainer/ModalContainer";
import { useGenericReducer } from "../hooks/useGenericReducer";

export const ModalContainerTestView = () => {
  // const [open, setOpen] = useState(false)

  const { state, actions } = useGenericReducer({
    reducers: {
      setOpen: (state, action) => ({
        ...state,
        open: action.payload,
      }),
      setTitle: (state, action) => ({
        ...state,
        title: action.payload,
      }),
    },
    initialState: {
      open: false,
      title: "",
    },
  });
  return (
    <>
      <Button
        onClick={() => {
          actions.setTitle("Title");
          actions.setOpen(true);
        }}
      >
        Open
      </Button>
      {state.open && (
        <ModalContainer
          open={state.open}
          s
          setOpen={actions.setOpen}
          title={state.title}
        >
          <Grid container sx={{ width: "300px" }}>
            Text
          </Grid>
          <Grid container>Text</Grid>
        </ModalContainer>
      )}
    </>
  );
};
