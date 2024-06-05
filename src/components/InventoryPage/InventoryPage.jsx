import { useTranslation } from "react-i18next";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import InventoryPageContext from "./context/InventoryPageContext";
import { Box } from "@mui/material";
import CustomTable from "../CustomTable/CustomTable";
import InventoryDetail from "./InventoryDetail/InventoryDetail";
// import ThreeDotsMenu from "./TicketMenu/TicketMenu.jsx";
import { useCustomTable } from "./hooks/useCustomTable";

const InventoryPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useContext(InventoryPageContext);

  const { getTableColums } = useCustomTable({
    state,
    // recordMode: {
    //   threeDots: {
    //     handleClick: () => {},
    //   },
    // },
    editMode: {
      handleView: () => {},
      handleEdit: () => {},
      handleDelete: () => {},
    },
  });

  const tableColumns = getTableColums();

  const subHeaderComponent = (
    <Box sx={{ p: 5 }}>
      <Grid container spacing={2}>
        Subheader
      </Grid>
    </Box>
  );

  return (
    <>
      {/* <ThreeDotsMenu
        anchorEl={threeDots.anchorEl}
        open={Boolean(threeDots.anchorEl)}
        handleClose={threeDots.handleClose}
      /> */}
      {subHeaderComponent}
      {state.settings && (
        <CustomTable
          tableColumns={tableColumns}
          state={state}
          actions={actions}
          detailComponent={InventoryDetail}
          pagination
        />
      )}
    </>
  );
};

export default InventoryPage;
