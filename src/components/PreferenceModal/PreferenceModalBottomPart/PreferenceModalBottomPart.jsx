import { Box, Stack, Typography } from "@mui/material";
import LayoutAllDocked from "./svg/LayoutAllDocked";
import LayoutAllExpanded from "./svg/LayoutAllExpanded";
import LayoutLeftExpanded from "./svg/LayoutLeftExpanded";
import LayoutRightExpanded from "./svg/LayoutRightExpanded";

const WIDTH = "110px";
const HEIGHT = "90px";

const SELECT_LAYOUT_OPTIONS = [
  {
    id: "1",
    label: "All docked",
    icon: <LayoutAllDocked width={WIDTH} height={HEIGHT} />,
  },
  {
    id: "2",
    label: "All expanded",
    icon: <LayoutAllExpanded width={WIDTH} height={HEIGHT} />,
  },
  {
    id: "3",
    label: "Left expanded",
    icon: <LayoutLeftExpanded width={WIDTH} height={HEIGHT} />,
  },
  {
    id: "4",
    label: "Right expanded",
    icon: <LayoutRightExpanded width={WIDTH} height={HEIGHT} />,
  },
];

export const PreferenceModalBottomPart = ({
  selectedLayout,
  setSelectedLayout,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
      {SELECT_LAYOUT_OPTIONS.map((layoutOption) => (
        <Box
          sx={{
            mr: 1,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.7,
            },
            border: "3px solid transparent",
            // boxShadow:
            //   selectedLayout === layoutOption.id ? "0 0 10px #ffa500" : "none",
            ...(selectedLayout === layoutOption.id && {
              borderColor: "orange", // Change border color upon selection
            }),
          }}
          key={layoutOption.id}
          onClick={() => setSelectedLayout(layoutOption.id)}
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
      ))}
    </Stack>
  );
};
