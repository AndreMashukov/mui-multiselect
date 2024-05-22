import { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { Grid } from "@mui/material";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledDataTable = styled(DataTable)`
  .rdt_TableHead {
    position: ${(props) => (props.stickyHeader ? "fixed" : "static")};
    top: 0;
    z-index: 1;
    background: white;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  overflow: auto;
`;

const CustomTable = ({
  tableColumns,
  state,
  actions,
  detailComponent,
  subHeaderComponent,
}) => {
  const wrapperRef = useRef(null);
  const tableRef = useRef(null);

  const [stickyHeader, setStickyHeader] = useState();

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const tableTopPosition = tableRef.current.getBoundingClientRect().top;
        const header = tableRef.current.querySelector(".rdt_TableHead");
        const headerHeight = header.getBoundingClientRect().height;
        const isHeaderOutOfViewport = tableTopPosition < -headerHeight;
        setStickyHeader(isHeaderOutOfViewport);
      }
    };

    if (wrapperRef.current) {
      wrapperRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <Grid item xs={12}>
      <Wrapper ref={wrapperRef}>
        <div ref={tableRef}>
          <StyledDataTable
            stickyHeader={stickyHeader}
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
            subHeader
            subHeaderComponent={subHeaderComponent}
            subHeaderAlign="left"
            subHeaderWrap
          />
        </div>
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
};
