import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import LaunchIcon from "@mui/icons-material/Launch";
import DownloadIcon from "@mui/icons-material/Download";
import { useEffect, useState } from "react";

export const useCustomTable = ({
  threeDots,
  launchButton,
  downloadButton,
  defaultSettings,
  tableName,
}) => {
  const { t } = useTranslation();
  const isReseller = false;
  const [settings, setSettings] = useState();

  useEffect(() => {
    let _settings = JSON.parse(localStorage.getItem(tableName));
    if (!_settings) {
      _settings = defaultSettings;
      localStorage.setItem(tableName, JSON.stringify(_settings));
    }
    setSettings(_settings);
  }, []);

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
      })),
    ];
  };

  return {
    getTableColums,
    settings
  };
};
