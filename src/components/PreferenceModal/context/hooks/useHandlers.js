import { PREFERENCE_SLICE_NAME } from "../../constants";

export const useHandlers = ({ state }) => {
  const handleUpdateClick = () => {
    localStorage.setItem(PREFERENCE_SLICE_NAME, JSON.stringify(state));
  };

  return {
    handleUpdateClick,
  };
};
