import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const DEFAULT_COLUMNS_SETTINGS = [
  {
    name: "inventory.space_id",
    selector: "space_id",
    tooltip: "space_other_name",
    allowOverflow: true,
    sortable: false,
    width: "200px",
  },
  {
    name: "inventory.end_customer",
    selector: "end_customer",
    allowOverflow: false,
    sortable: false,
    width: "250px",
    // omit: !isReseller,
    omitIfReseller: true,
  },
  {
    name: "inventory.service_name",
    selector: "service_name",
    allowOverflow: true,
    sortable: true,
    width: "200px",
  },
  {
    name: "inventory.location_name",
    selector: "location_name",
    allowOverflow: true,
    sortable: true,
  },
  {
    name: "inventory.product_name",
    selector: "product_name",
    allowOverflow: true,
    sortable: true,
    width: "250px",
  },
  {
    name: "inventory.product_attribute",
    selector: "product_attribute",
    allowOverflow: true,
    sortable: false,
    width: "200px",
  },
  {
    name: "inventory.sales_order_name",
    selector: "sales_order_name",
    allowOverflow: true,
    sortable: false,
    width: "200px",
  },
  {
    name: "inventory.qty",
    selector: "qty",
    sortable: true,
    width: "200px",
  },
  {
    name: "inventory.status",
    selector: "status",
    sortable: true,
    width: "200px",
  },
  {
    name: "inventory.created_by",
    selector: "created_by",
    sortable: true,
    width: "200px",
    omit: true,
  },
  {
    name: "inventory.legacy_number",
    selector: "legacy_number",
    sortable: true,
    width: "200px",
  },
  {
    name: "inventory.cs_reference",
    selector: "payment_state",
    sortable: true,
    width: "200px",
  },
  {
    name: "inventory.installed_date",
    selector: "installed_date",
    sortable: true,
    width: "200px",
  },
  {
    name: "inventory.contract_end_date",
    selector: "contract_end_date",
    sortable: true,
    width: "200px",
  },
];

export const useTableDefinitions = ({ threeDots }) => {
  const { t } = useTranslation();
  const isReseller = false;

  const [threeDotsAnchorEl, setThreeDotsAnchorEl] = useState(null);

  const threeDotsHandleClose = () => {
    setThreeDotsAnchorEl(null);
  };

  const threeDotsHandleClick = (event, rawData) => {
    setThreeDotsAnchorEl(event.currentTarget);
  };

  const getTableColums = () => {
    const buttons = [];

    if (threeDots) {
      buttons.push({
        button: true,
        cell: (row) => (
          <div data-cy="inventory-div-24603">
            <IconButton
              data-cy="inventory-icon-button-77692"
              id={"long-button"}
              aria-haspopup="true"
              onClick={(e) => threeDotsHandleClick(e, row)}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        ),
        width: "50px",
      });
    }

    return [
      ...buttons,
      ...DEFAULT_COLUMNS_SETTINGS.map((col) => {
        return {
          name: t(col.name),
          selector: (row) => {
            const value = row[col.selector];
            if (col.tooltip) {
              return (
                <Tooltip
                  title={row[col.tooltip]}
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        // color: "purple",
                        backgroundColor: "black",
                        fontSize: "1em",
                      },
                    },
                  }}
                >
                  <span>{value}</span>
                </Tooltip>
              );
            }
            return value;
          },
          allowOverflow: col.allowOverflow,
          sortable: col.sortable,
          width: col.width,
          omit: !isReseller && col.omitIfReseller,
          tooltip: col.tooltip,
          reorder: true,
        };
      }),
    ];
  };

  return {
    getTableColums,
    threeDots: {
      anchorEl: threeDotsAnchorEl,
      handleClose: threeDotsHandleClose,
      handleClick: threeDotsHandleClick,
    },
  };
};
