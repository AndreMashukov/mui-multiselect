import { IconButton, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import LaunchIcon from "@mui/icons-material/Launch";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export const useCustomTable = ({ recordMode, editMode, state }) => {
  const { t } = useTranslation();
  const isReseller = false;

  const { settings, tableName } = state;

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

  const getEditModeButtons = () => {
    const { handleView, handleEdit, handleDelete } = editMode;
    const buttons = [];
    if (handleView) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-view-24603`,
          handleClick: handleView,
          icon: <VisibilityIcon />,
        })
      );
    }
    if (handleEdit) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-edit-24603`,
          handleClick: handleEdit,
          icon: <ModeEditIcon />,
        })
      );
    }
    if (handleDelete) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-delete-24603`,
          handleClick: handleDelete,
          icon: <DeleteIcon />,
        })
      );
    }
    return buttons;
  };

  const getRecordModeButtons = () => {
    const { threeDots, launchButton, downloadButton } = recordMode;
    const buttons = [];
    if (threeDots) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-threeDots-24603`,
          handleClick: threeDots.handleClick,
          icon: <MoreVertIcon />,
        })
      );
    }
    if (launchButton) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-launch-24603`,
          handleClick: () => {},
          icon: <LaunchIcon />,
        })
      );
    }

    if (downloadButton) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-download-24603`,
          handleClick: () => {},
          icon: <DownloadIcon />,
        })
      );
    }
    return buttons;
  };

  const getTableColums = () => {
    if (!settings) return [];
    const buttons = [];

    if (recordMode) {
      buttons.push(...getRecordModeButtons());
    } else if (editMode) {
      buttons.push(...getEditModeButtons());
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
