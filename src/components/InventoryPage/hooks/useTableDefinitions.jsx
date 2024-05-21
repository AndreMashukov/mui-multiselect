import {IconButton, Tooltip} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useTranslation} from "react-i18next";

export const useTableDefinitions = () => {
  const {t} = useTranslation();
  const isReseller = false

  const getTableColums = ({open, handleClick}) => [
    {
      button: true,
      cell: (row) => (
        <div data-cy="inventory-div-24603">
          <IconButton
            data-cy="inventory-icon-button-77692"
            aria-label="more"
            id={"long-button"}
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => handleClick(e, row)}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
      width: "50px",
    },
    {
      name: t("inventory.space_id"),
      selector: (row) => (
        <Tooltip
          title={row.space_other_name}
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
          <span>{row.space_id}</span>
        </Tooltip>
      ),
      sortable: false,
      reorder: true,
      lable: "space_id",
      allowOverflow: true,
      width: "200px",
    },
    {
      name: t("inventory.end_customer"),
      selector: (row) => row.end_customer,
      sortable: false,
      reorder: true,
      lable: "end_customer",
      allowOverflow: false,
      width: "250px",
      omit: !isReseller,
    },
    {
      name: t("inventory.service_name"),
      selector: (row) => row.service_name,
      sortable: true,
      reorder: true,
      lable: "service_name",
      allowOverflow: true,
      width: "200px",
    },
    {
      name: t("inventory.location_name"),
      selector: (row) => row.location_name,
      sortable: true,
      reorder: true,
      lable: "location_name",
    },
    {
      name: t("inventory.product_name"),
      selector: (row) => row.product_name,
      sortable: true,
      reorder: true,
      lable: "product_name",
      allowOverflow: true,
      width: "250px",
    },
    {
      name: t("inventory.product_attribute"),
      selector: (row) => row.product_attribute,
      sortable: false,
      reorder: true,
      lable: "product_attribute",
      allowOverflow: true,
      width: "200px",
    },
    {
      name: t("inventory.sales_order_name"),
      selector: (row) => row.sales_order_name,
      sortable: false,
      reorder: true,
      lable: "sales_order_name",
      allowOverflow: true,
      width: "200px",
    },
    {
      name: t("inventory.qty"),
      selector: (row) => row.qty,
      sortable: true,
      reorder: true,
      lable: "qty",
      width: "200px",
    },
    {
      name: t("inventory.status"),
      selector: (row) => row.status,
      sortable: true,
      reorder: true,
      lable: "status",
      width: "200px",
    },
    {
      name: t("inventory.created_by"),
      selector: (row) => row.created_by,
      sortable: true,
      reorder: true,
      lable: "created_by",
      width: "200px",
      omit: true,
    },
    {
      name: t("inventory.legacy_number"),
      selector: (row) => row.legacy_number,
      sortable: true,
      reorder: true,
      lable: "legacy_number",
      allowOverflow: true,
      width: "200px",
    },
    {
      name: t("inventory.cs_reference"),
      selector: (row) => row.payment_state,
      sortable: true,
      reorder: true,
      lable: "cs_reference",
      allowOverflow: true,
      width: "200px",
    },
    {
      name: t("inventory.installed_date"),
      selector: (row) => row.installed_date,
      sortable: true,
      reorder: true,
      lable: "installed_date",
      allowOverflow: true,
      width: "200px",
    },
    {
      name: t("inventory.contract_end_date"),
      selector: (row) => (
        <span data-tag="allowRowEvents">{row.contract_end_date}</span>
      ),
      sortable: true,
      reorder: true,
      lable: "contract_end_date",
      width: "200px",
    },
  ];

  return {
    getTableColums,
  };
};
