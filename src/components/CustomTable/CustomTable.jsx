import DataTable from "react-data-table-component";
import { Grid } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  height: 80vh;
  overflow: hidden;

  .rdt_TableBody {
    min-height: 68vh !important;
  }
`;

const CustomTable = ({
  tableColumns,
  state,
  actions,
  detailComponent,
  pagination
}) => {

  const onSort = (column, sortDirection) => {
    if (column && column.id) {
      actions.setSort({
        lable: column.id,
        sortDirection,
      });
    }
  };

  return (
    <Grid item xs={12}>
      <Wrapper>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          columns={tableColumns}
          data={state.tableRows}
          progressPending={state.loading}
          pagination={pagination}
          paginationServer
          paginationTotalRows={state.totalRows}
          onChangePage={actions.setPage}
          onChangeRowsPerPage={actions.setItemsPerPage}
          onColumnOrderChange={() => {}}
          onSort={onSort}
          striped={true}
          highlightOnHover={true}
          enableColumnResizing
          responsive={true}
          pointerOnHover={true}
          paginationRowsPerPageOptions={[10, 20, 50, 100, 200]}
          expandableRows={Boolean(detailComponent)}
          expandableRowsComponent={detailComponent}
          defaultColumn={{
            maxSize: 400,
            minSize: 80,
            size: 150,
          }}
        />
      </Wrapper>
    </Grid>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  tableColumns: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  detailComponent: PropTypes.elementType.isRequired,
  subHeaderComponent: PropTypes.elementType.isRequired,
  pagination: PropTypes.bool,
};
