import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import LaunchIcon from "@mui/icons-material/Launch";
import DownloadIcon from "@mui/icons-material/Download";

export const useCustomTable = ({
  threeDots,
  launchButton,
  downloadButton,
  state,
}) => {
  const { t } = useTranslation();
  const isReseller = false;

  const { settings, tableName } = state

  const getTableColums = () => {
    if (!settings) return [];
    const buttons = [];

    const getButton = ({ dataCy, handleClick, icon }) => ({
      button: true,
      cell: (row) => (
        <div data-cy={dataCy}>
          <IconButton
            data-cy={dataCy}
            id={"long-button"}
            aria-haspopup="true"
            onClick={(e) => handleClick(e, row)}
          >
            {icon}
          </IconButton>
        </div>
      ),
      width: "50px",
    });

    if (threeDots) {
      buttons.push(
        getButton({
          dataCy: "inventory-button-threeDots-24603",
          handleClick: threeDots.handleClick,
          icon: <MoreVertIcon />,
        })
      );
    }
    if (launchButton) {
      buttons.push(
        getButton({
          dataCy: "inventory-button-launch-24603",
          handleClick: () => {},
          icon: <LaunchIcon />,
        })
      );
    }

    if (downloadButton) {
      buttons.push(
        getButton({
          dataCy: "inventory-button-download-24603",
          handleClick: () => {},
          icon: <DownloadIcon />,
        })
      );
    }

    return [
      ...buttons,
      ...settings.map((col) => ({
        ...col,
        name: t(`${tableName}.${col.selector}`),
        label: col.selector,
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
        omit: !isReseller && col.omitIfReseller,
        reorder: true,
      })),
    ];
  };

  return {
    getTableColums,
  };
};
