import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useTranslation } from "react-i18next";
import LaunchIcon from "@mui/icons-material/Launch";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export const useCustomTable = ({ recordMode, editMode, state }) => {
  const isReseller = true;

  const { settings, tableName } = state;

  const getButton = ({ dataCy, handleClick, icon, isPermitted }) => ({
    button: true,
    cell: (row) => (
      <div data-cy={dataCy}>
        <IconButton
          disabled={!isPermitted}
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
          // isPermitted: editMode.permitted.isView,
          isPermitted: true,
        })
      );
    }
    if (handleEdit) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-edit-24603`,
          handleClick: handleEdit,
          icon: <ModeEditIcon />,
          // isPermitted: editMode.permitted.isEdit,
          isPermitted: true,
        })
      );
    }
    if (handleDelete) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-delete-24603`,
          handleClick: handleDelete,
          icon: <DeleteIcon />,
          // isPermitted: editMode.permitted.isDelete,
          isPermitted: true,
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
          isPermitted: true,
        })
      );
    }
    if (launchButton) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-launch-24603`,
          handleClick: () => {},
          icon: <LaunchIcon />,
          isPermitted: true,
        })
      );
    }

    if (downloadButton) {
      buttons.push(
        getButton({
          dataCy: `${tableName}-button-download-24603`,
          handleClick: () => {},
          icon: <DownloadIcon />,
          isPermitted: true,
        })
      );
    }
    return buttons;
  };

  // console.log(settings, state.selectors)
  const getSelector = (id) => {
    return state.selectors.find((s) => s.id === id)?.selector;
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
        selector: getSelector(col.id),
        omit: !isReseller && col.omitIfReseller,
      })),
    ];
  };

  return {
    getTableColums,
  };
};
