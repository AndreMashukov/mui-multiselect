import React from 'react';
import Box from "@mui/material/Box";
import {useTranslation} from "react-i18next";
import {css} from "glamor";

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "60%",
  },
  thtd1: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
    color: "#808080",
    fontSize: "13px",
    width: "30%",
  },
  thtd2: {
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: "8px",
    color: "#808080",
    fontSize: "13px",
  },
  textaligne: {
    textAlign: "center",
  },
};

const unselectedFields = [
  "location_id",
  "product_code",
  "project_task_id",
  "po_number",
  "created_by",
];

const InventoryDetail = ({data}) => {
  const {t} = useTranslation();
  return (
    <Box sx={{width: "60%"}}>
      {data && Object.keys(data).length > 0 && (
        <table {...css(styles.table)}>
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key, i) => {
              if (
                !unselectedFields.includes(key) &&
                data[key] !== "" &&
                data[key] !== null &&
                key !== "space_id_id" &&
                key !== "end_customer_id"
              ) {
                return (
                  <tr key={i}>
                    <td {...css(styles.thtd1)}>{t(`inventory.${key}`)} </td>
                    <td {...css(styles.thtd2)}>{data[key]}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
    </Box>
  );
};

export default InventoryDetail;