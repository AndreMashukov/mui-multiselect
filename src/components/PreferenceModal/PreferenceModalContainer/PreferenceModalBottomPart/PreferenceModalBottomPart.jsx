import { Box, Stack, Typography, useTheme } from "@mui/material";
import LayoutAllDocked from "./svg/LayoutAllDocked";
import LayoutAllExpanded from "./svg/LayoutAllExpanded";
import LayoutLeftExpanded from "./svg/LayoutLeftExpanded";
import LayoutRightExpanded from "./svg/LayoutRightExpanded";
import { useContext } from "react";
import { PreferenceModalContext } from "../../context/PreferenceModalContext";

const WIDTH = "110px";
const HEIGHT = "90px";

const SELECT_LAYOUT_OPTIONS = [
  {
    id: "all-docked",
    label: "All docked",
    icon: <LayoutAllDocked width={WIDTH} height={HEIGHT} />,
  },
  {
    id: "all-expanded",
    label: "All expanded",
    icon: <LayoutAllExpanded width={WIDTH} height={HEIGHT} />,
  },
  {
    id: "left-expanded",
    label: "Left expanded",
    icon: <LayoutLeftExpanded width={WIDTH} height={HEIGHT} />,
  },
  {
    id: "right-expanded",
    label: "Right expanded",
    icon: <LayoutRightExpanded width={WIDTH} height={HEIGHT} />,
  },
];

const LayoutOption = ({
  layoutOption,
  selectedLayout,
  onSelectLayout,
  theme,
}) => (
  <Box
    sx={{
      cursor: "pointer",
      "&:hover": {
        opacity: 0.7,
      },
      border: "3px solid transparent",
      ...(selectedLayout === layoutOption.id && {
        borderColor: theme.palette.primary.main,
      }),
      flex: 1,
      mr: "0.5rem", // Adjust based on your requirement
    }}
    onClick={() => onSelectLayout(layoutOption.id)}
    key={layoutOption.id}
  >
    <Stack>
      <Box
        sx={{
          display: "inline-block",
          p: 1,
          ...(selectedLayout === layoutOption.id && {
            backgroundColor: "rgba(255, 165, 0, 0.2)",
          }),
        }}
      >
        {layoutOption.icon}
      </Box>
    </Stack>
    <Stack
      sx={{
        ...(selectedLayout === layoutOption.id && {
          backgroundColor: "rgba(255, 165, 0, 0.2)",
        }),
      }}
    >
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
        }}
      >
        {layoutOption.label}
      </Typography>
    </Stack>
  </Box>
);

export const PreferenceModalBottomPart = ({ isMobile }) => {
  const { state, actions } = useContext(PreferenceModalContext);
  const { selectedLayout } = state;
  const { setSelectedLayout } = actions;
  const theme = useTheme();

  if (isMobile) {
    const rows = [];
    for (let i = 0; i < SELECT_LAYOUT_OPTIONS.length; i += 2) {
      rows.push(
        <Stack
          key={i}
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 1 }}
        >
          {[SELECT_LAYOUT_OPTIONS[i], SELECT_LAYOUT_OPTIONS[i + 1]].map(
            (layoutOption, index) =>
              layoutOption && (
                <LayoutOption
                  key={layoutOption.id}
                  layoutOption={layoutOption}
                  selectedLayout={selectedLayout}
                  onSelectLayout={setSelectedLayout}
                  theme={theme}
                />
              )
          )}
        </Stack>
      );
    }
    return rows;
  }

  return (
    <Stack direction="row">
      {SELECT_LAYOUT_OPTIONS.map((layoutOption) => (
        <LayoutOption
          key={layoutOption.id}
          layoutOption={layoutOption}
          selectedLayout={selectedLayout}
          onSelectLayout={setSelectedLayout}
          theme={theme}
        />
      ))}
    </Stack>
  );
};
