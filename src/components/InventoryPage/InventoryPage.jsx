import { useTranslation } from "react-i18next";
import { useContext } from "react";
import DataTable from "react-data-table-component";
import Grid from "@mui/material/Grid";
import { useTableDefinitions } from "./hooks/useTableDefinitions.jsx";
import InventoryPageContext from "./context/InventoryPageContext";
// import TicketMenu from "./TicketMenu/TicketMenu.jsx";
import InventoryDetail from "./InventoryDetail/InventoryDetail.jsx";
import styled from "styled-components";

const StyledDataTable = styled(DataTable)`
  .rdt_TableHead {
    position: fixed;
    top: 0;
    z-index: 100;
    background: white;
  }
`;

const Wrapper = styled.div`
  height: 100vh; 
  overflow: auto;
`;

const InventoryPage = () => {
  const { t } = useTranslation();
  const { state, actions } = useContext(InventoryPageContext);

  const { getTableColums } = useTableDefinitions({
    threeDots: {
      handleClick: () => {},
    },
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
      {/* <TicketMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        showTicketsModal={showTicketsModal}
        ticketList={ticketList}
      /> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Wrapper>
            <StyledDataTable
              columns={tableColumns}
              data={state.tableRows}
              progressPending={state.loading}
              pagination
              paginationServer
              paginationTotalRows={state.totalRows}
              onChangePage={actions.setPage}
              onChangeRowsPerPage={actions.setItemsPerPage}
              onColumnOrderChange={() => {}}
              onSort={actions.setSort}
              striped={true}
              highlightOnHover={true}
              enableColumnResizing
              expandableRows
              responsive={true}
              pointerOnHover={true}
              paginationRowsPerPageOptions={[10, 20, 50, 100, 200]}
              expandableRowsComponent={InventoryDetail}
              defaultColumn={{
                maxSize: 400,
                minSize: 80,
                size: 150,
              }}
              subHeader
              subHeaderComponent={subHeaderComponent}
              subHeaderAlign="left"
              subHeaderWrap
            />
          </Wrapper>
        </Grid>
      </Grid>
    </>
  );
};

export default InventoryPage;
