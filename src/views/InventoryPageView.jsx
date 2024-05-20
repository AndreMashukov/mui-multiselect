import InventoryPage from "../components/InventoryPage/InventoryPage";
import InventoryPageContextProvider from "../components/InventoryPage/context/InventoryPageContextProvider";

export const InventoryPageView = () => {
  return (
    <InventoryPageContextProvider>
      <InventoryPage />
    </InventoryPageContextProvider>
  );
};
