import { useTranslation } from "react-i18next";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import InventoryPageContext from "./context/InventoryPageContext";
// import TicketMenu from "./TicketMenu/TicketMenu.jsx";
import InventoryDetail from "./InventoryDetail/InventoryDetail.jsx";
import CustomTable from "../CustomTable/CustomTable.jsx";
// import ThreeDotsMenu from "./TicketMenu/TicketMenu.jsx";
import { useCustomTable } from "./hooks/useCustomTable.jsx";
import { Box } from "@mui/material";
import { DEFAULT_COLUMNS_SETTINGS } from "./inventoryTableDefaultSettings.js";

const InventoryPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useContext(InventoryPageContext);

  const { getTableColums, settings } = useCustomTable({
    threeDots: {
      handleClick: () => {},
    },
    defaultSettings: DEFAULT_COLUMNS_SETTINGS,
    tableName: "inventory",
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
      {settings && (
        <CustomTable
          tableColumns={tableColumns}
          state={state}
          actions={actions}
          detailComponent={InventoryDetail}
          // subHeaderComponent={subHeaderComponent}
        />
      )}
    </>
  );
};

export default InventoryPage;
