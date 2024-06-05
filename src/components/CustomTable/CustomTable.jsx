import DataTable from "react-data-table-component";
import { Grid } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
  pagination,
  customStyles,
}) => {
  const { sort } = state;

  const updateLocalStorageProperty = (tableName, property, value) => {
    const storedSettings = JSON.parse(localStorage.getItem(tableName));
    storedSettings[property] = value;
    localStorage.setItem(tableName, JSON.stringify(storedSettings));
  };

  const onSort = (column, sortDirection) => {
    if (column && column.id) {
      actions.setSort({
        lable: column.id,
        sortDirection,
      });

      updateLocalStorageProperty(state.tableName, "sort", {
        sort: column.id,
        sortDir: sortDirection,
      });
    }
  };

  const getSortIcon = (direction) => {
    if (!direction) return null;
    if (direction === "asc")
      return <ArrowUpwardIcon style={{ fontSize: "inherit" }} />;
    if (direction === "desc")
      return <ArrowDownwardIcon style={{ fontSize: "inherit" }} />;
  };

  const modifiedColumns = tableColumns.map((col) => {
    if (col.sortable) {
      return {
        ...col,
        name: (
          <div>
            {col.name} {getSortIcon(sort.sort === col.id ? sort.sortDir : null)}
          </div>
        ),
      };
    }
    return col;
  });

  return (
    <Grid item xs={12}>
      <Wrapper>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          columns={modifiedColumns}
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
          customStyles={customStyles}
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
  detailComponent: PropTypes.elementType,
  subHeaderComponent: PropTypes.elementType,
  pagination: PropTypes.bool,
};
