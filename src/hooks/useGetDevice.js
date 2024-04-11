import useMediaQuery from "@mui/material/useMediaQuery";

export default function useGetDevice() {
  const isDesktop = useMediaQuery("(min-width:992px)");
  const isMobile = useMediaQuery("(max-width:992px)");

  return {isDesktop, isMobile};
}
