import InventoryPageContext from "./InventoryPageContext";
import {useFetchInventory} from "./hooks/api/useFetchInventory";
import { useInventoryPageReducer } from "./hooks/reducer/useInventoryPageReducer";
// import {useInvoicePageReducer} from "./hooks/reducer/useInvoicePageReducer";
// import {useHandlers} from "./hooks/useHandlers";

const InventoryPageContextProvider = ({children}) => {
  const {state, actions} = useInventoryPageReducer();
  useFetchInventory({state, actions});

  return (
    <InventoryPageContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
    </InventoryPageContext.Provider>
  );
};

export default InventoryPageContextProvider;
