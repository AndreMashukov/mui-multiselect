import { useTranslation } from "react-i18next";
import { useContext } from "react";
import Grid from "@mui/material/Grid";
import { useTableDefinitions } from "./hooks/useTableDefinitions.jsx";
import InventoryPageContext from "./context/InventoryPageContext";
// import TicketMenu from "./TicketMenu/TicketMenu.jsx";
import InventoryDetail from "./InventoryDetail/InventoryDetail.jsx";
import CustomTable from "../CustomTable/CustomTable.jsx";
import ThreeDotsMenu from "./TicketMenu/TicketMenu.jsx";

const InventoryPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useContext(InventoryPageContext);

  const { getTableColums, threeDots } = useTableDefinitions({
    threeDots: true,
    launchButton: true,
    downloadButton: true,    
  });

  const tableColumns = getTableColums();

  const subHeaderComponent = (
    <>
      <Grid container spacing={2}>
        Subheader
      </Grid>
    </>
  );

  return (
    <>
      <ThreeDotsMenu
        anchorEl={threeDots.anchorEl}
        open={Boolean(threeDots.anchorEl)}
        handleClose={threeDots.handleClose}
      />
      <CustomTable
        tableColumns={tableColumns}
        state={state}
        actions={actions}
        detailComponent={InventoryDetail}
        subHeaderComponent={subHeaderComponent}
      />
    </>
  );
};

export default InventoryPage;
