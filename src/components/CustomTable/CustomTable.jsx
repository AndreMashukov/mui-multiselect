import DataTable from "react-data-table-component";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SettingsIcon from "@mui/icons-material/Settings";

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
  const { sort, columnOrder, hiddenColumns, showHideColumnsModal } = state;
  const { setSort, setColumnOrder, setHiddenColumns, setShowHideColumnsModal } =
    actions;

  const updateLocalStorageProperty = (tableName, property, value) => {
    const storedSettings = JSON.parse(localStorage.getItem(tableName));
    storedSettings[property] = value;
    localStorage.setItem(tableName, JSON.stringify(storedSettings));
  };

  const onSort = (column, sortDirection) => {
    if (column && column.id) {
      setSort({
        lable: column.id,
        sortDirection,
      });

      updateLocalStorageProperty(state.tableName, "sort", {
        sort: column.id,
        sortDir: sortDirection,
      });
    }
  };

  const onColumnOrderChange = (newOrder) => {
    const filteredNewOrder = newOrder
      .filter((col) => !col.button)
      .map((col) => col.id);
    // console.log(filteredNewOrder);
    setColumnOrder(filteredNewOrder);
    updateLocalStorageProperty(
      state.tableName,
      "columnOrder",
      filteredNewOrder
    );
  };

  const toggleColumn = (columnId) => {
    let updatedHiddenColumns;
    if (hiddenColumns.includes(columnId)) {
      updatedHiddenColumns = hiddenColumns.filter((id) => id !== columnId);
    } else {
      updatedHiddenColumns = [...hiddenColumns, columnId];
    }
    setHiddenColumns(updatedHiddenColumns);
    updateLocalStorageProperty(
      state.tableName,
      "hiddenColumns",
      updatedHiddenColumns
    );
  };

  const getSortIcon = (direction) => {
    if (!direction) return null;
    if (direction === "asc")
      return <ArrowUpwardIcon style={{ fontSize: "14px" }} />;
    if (direction === "desc")
      return <ArrowDownwardIcon style={{ fontSize: "14px" }} />;
  };

  const modifiedColumns = tableColumns
    .filter((col) => !hiddenColumns.includes(col.id))
    .map((col) => {
      if (col.sortable) {
        return {
          ...col,
          name: (
            <div>
              {col.name}{" "}
              {getSortIcon(sort.sort === col.id ? sort.sortDir : null)}
            </div>
          ),
        };
      }
      return col;
    })
    .sort((a, b) => columnOrder.indexOf(a.id) - columnOrder.indexOf(b.id));

  return (
    <>
      <Grid item xs={12} sx={{ position: "relative" }}>
        <IconButton
          onClick={() => setShowHideColumnsModal(true)}
          sx={{
            position: "absolute",
            top: "-15px",
            left: 0,
            zIndex: 1000,
          }}
        >
          <SettingsIcon />
        </IconButton>
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
            onColumnOrderChange={onColumnOrderChange}
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
      <Dialog
        open={showHideColumnsModal}
        onClose={() => setShowHideColumnsModal(false)}
      >
        <DialogTitle>Hide/Unhide Columns</DialogTitle>
        <DialogContent>
          {tableColumns
            .filter((col) => !col.button)
            .map((column) => (
              <Stack flexDirection="column">
                <FormControlLabel
                  key={column.id}
                  control={
                    <Checkbox
                      checked={!hiddenColumns.includes(column.id)}
                      onChange={() => toggleColumn(column.id)}
                    />
                  }
                  label={column.name}
                />
              </Stack>
            ))}
        </DialogContent>
      </Dialog>
    </>
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
  customStyles: PropTypes.object,
};
