import InventoryPage from "../components/InventoryPage/InventoryPage";
import InventoryPageContextProvider from "../components/InventoryPage/context/InventoryPageContextProvider";
import { Page } from "../components/Page/page";

export const InventoryPageView = () => {
  return (
    <Page title="Colocations">
      <InventoryPageContextProvider>
        <InventoryPage />
      </InventoryPageContextProvider>
    </Page>
  );
};
