import DataTable from "react-data-table-component";
import {
  Checkbox,
  DialogContent,
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
import { StyledDialog } from "../Modal/StyledDialog.styled";
import ModalHeader from "../Modal/ModalHeader/ModalHeader";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
    let updatedColumnOrder = [...columnOrder];

    if (hiddenColumns.includes(columnId)) {
      // Remove from hiddenColumns
      updatedHiddenColumns = hiddenColumns.filter((id) => id !== columnId);
      // Append to the end of columnOrder
      if (!updatedColumnOrder.includes(columnId)) {
        updatedColumnOrder.push(columnId);
      }
    } else {
      // Add to hiddenColumns
      updatedHiddenColumns = [...hiddenColumns, columnId];
      // Remove from columnOrder
      updatedColumnOrder = updatedColumnOrder.filter((id) => id !== columnId);
    }

    // Remove duplicates in columnOrder
    updatedColumnOrder = [...new Set(updatedColumnOrder)];

    // Update state
    setHiddenColumns(updatedHiddenColumns);
    setColumnOrder(updatedColumnOrder);

    // Update local storage
    updateLocalStorageProperty(
      state.tableName,
      "hiddenColumns",
      updatedHiddenColumns
    );
    updateLocalStorageProperty(
      state.tableName,
      "columnOrder",
      updatedColumnOrder
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
    // Clear hiddenColumns
    setHiddenColumns([]);
    updateLocalStorageProperty(state.tableName, "hiddenColumns", []);

    // Get all column IDs that are not buttons or omitted
    const allColumnIds = tableColumns
      .map((col) => col.id)
      .filter((id) => {
        const col = tableColumns.find((column) => column.id === id);
        return col && !col.button && !col.omit;
      });

    // Update columnOrder with all columns, ensuring no duplicates
    const updatedColumnOrder = [...new Set([...columnOrder, ...allColumnIds])];
    setColumnOrder(updatedColumnOrder);
    updateLocalStorageProperty(
      state.tableName,
      "columnOrder",
      updatedColumnOrder
    );
  };

  const areAllColumnsSelected = tableColumns
    .filter((col) => !col.button && !col.omit)
    .every((col) => !hiddenColumns.includes(col.id));

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
      <StyledDialog
        open={showHideColumnsModal}
        onClose={() => setShowHideColumnsModal(false)}
      >
        <ModalHeader
          title={t("hide-unhide-columns")}
          handleCloseModal={() => setShowHideColumnsModal(false)}
          showCloseButton
        />

        <DialogContent>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: "10px",
              minWidth: "420px",
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
              {t("select-all")}
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
      </StyledDialog>
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
