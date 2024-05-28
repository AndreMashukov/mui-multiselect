import DataTable from "react-data-table-component";
import { Grid } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

// export const DEFAULT_COLUMNS_SETTINGS = [
//   {
//     name: "inventory.space_id",
//     selector: "space_id",
//     tooltip: "space_other_name",
//     allowOverflow: true,
//     sortable: false,
//     width: "200px",
//   },
//   {
//     name: "inventory.end_customer",
//     selector: "end_customer",
//     allowOverflow: false,
//     sortable: false,
//     width: "250px",
//     // omit: !isReseller,
//     omitIfReseller: true,
//   },
//   {
//     name: "inventory.service_name",
//     selector: "service_name",
//     allowOverflow: true,
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "inventory.location_name",
//     selector: "location_name",
//     allowOverflow: true,
//     sortable: true,
//   },
//   {
//     name: "inventory.product_name",
//     selector: "product_name",
//     allowOverflow: true,
//     sortable: true,
//     width: "250px",
//   },
//   {
//     name: "inventory.product_attribute",
//     selector: "product_attribute",
//     allowOverflow: true,
//     sortable: false,
//     width: "200px",
//   },
//   {
//     name: "inventory.sales_order_name",
//     selector: "sales_order_name",
//     allowOverflow: true,
//     sortable: false,
//     width: "200px",
//   },
//   {
//     name: "inventory.qty",
//     selector: "qty",
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "inventory.status",
//     selector: "status",
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "inventory.created_by",
//     selector: "created_by",
//     sortable: true,
//     width: "200px",
//     omit: true,
//   },
//   {
//     name: "inventory.legacy_number",
//     selector: "legacy_number",
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "inventory.cs_reference",
//     selector: "payment_state",
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "inventory.installed_date",
//     selector: "installed_date",
//     sortable: true,
//     width: "200px",
//   },
//   {
//     name: "inventory.contract_end_date",
//     selector: "contract_end_date",
//     sortable: true,
//     width: "200px",
//   },
// ];


const Wrapper = styled.div`
  height: 80vh;
  overflow: hidden;

  .rdt_TableBody {
    min-height: 68vh !important;
  }
`;

const CustomTable = ({
  tableName,
  tableColumns,
  state,
  actions,
  detailComponent,
}) => {

  const onSort = (column) => {
    console.log({tableName, column})
    actions.setSort(column);
  }

  return (
    <Grid item xs={12}>
      <Wrapper>
        <DataTable
          fixedHeader
          fixedHeaderScrollHeight="75vh"
          columns={tableColumns}
          data={state.tableRows}
          progressPending={state.loading}
          pagination
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
          // subHeader
          // subHeaderComponent={subHeaderComponent}
          // subHeaderAlign="left"
          // subHeaderWrap
        />
      </Wrapper>
    </Grid>
  );
};

export default CustomTable;

CustomTable.propTypes = {
  tableName: PropTypes.string.isRequired,
  tableColumns: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  detailComponent: PropTypes.elementType.isRequired,
  subHeaderComponent: PropTypes.elementType.isRequired,
};
