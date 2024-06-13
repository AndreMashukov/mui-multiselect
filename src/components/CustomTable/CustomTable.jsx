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
  Typography,
} from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SettingsIcon from "@mui/icons-material/Settings";
import { grey } from "@mui/material/colors";

const Wrapper = styled.div`
  height: 80vh;
  overflow: hidden;

  .rdt_TableBody {
    min-height: 68vh !important;
  }
  .rdt_TableCol_Sortable > span {
    color: white;
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
    const sortDir = sort.sortDir === "asc" ? "desc" : "asc";
    if (column && column.id) {
      setSort({
        lable: column.id,
        sortDirection: sortDir,
      });

      updateLocalStorageProperty(state.tableName, "sort", {
        sort: column.id,
        sortDir: sortDir,
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

  const selectAllColumns = () => {
    setHiddenColumns([]);
    updateLocalStorageProperty(state.tableName, "hiddenColumns", []);
  };

  const areAllColumnsSelected = tableColumns
    .filter((col) => !col.button && !col.omit)
    .every((col) => !hiddenColumns.includes(col.id));

  const fixedHeaderScrollHeight = window.innerWidth > 1000 ? "70vh" : "75vh";

  return (
    <>
      <Grid item xs={12} sx={{ position: "relative", pt: 3 }}>
        <IconButton
          onClick={() => setShowHideColumnsModal(true)}
          sx={{
            position: "absolute",
            top: "-15px",
            right: 0,
            zIndex: 1000,
          }}
        >
          <SettingsIcon />
        </IconButton>
        <Wrapper>
          <DataTable
            fixedHeader
            fixedHeaderScrollHeight={fixedHeaderScrollHeight}
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
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: "10px",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: areAllColumnsSelected ? grey[500] : "black",
                cursor: areAllColumnsSelected ? "not-allowed" : "pointer",
                "&:hover": {
                  color: grey[500],
                },
              }}
              onClick={areAllColumnsSelected ? null : selectAllColumns}
            >
              Select All
            </Typography>
          </div>
          {tableColumns
            .filter((col) => !col.button)
            .filter((col) => !col.omit)
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
