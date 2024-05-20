import {useEffect} from "react";
import {useGetInventory} from "./useGetInventory";

export const useFetchInventory = ({state, actions}) => {
  const {getInventory} = useGetInventory({state, actions});

  useEffect(() => {
    getInventory();
  }, [
    state.page,
    state.itemsPerPage,
    JSON.stringify(state.rawFilter),
    state.sort.sort,
    state.sort.sortDir,
    state.productCategory,
    state.endCustomer,
  ]);
};
