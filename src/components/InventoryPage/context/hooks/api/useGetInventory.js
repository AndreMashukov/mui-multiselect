import { removeNullValues } from "../../../../utils";
import { mock } from "./MOCK";

export const useGetInventory = ({ state, actions }) => {

  // console.log("***", mock())
  const isReseller = false;

  const getInventory = () => {
    actions.setLoading(true);

    // const body = {
    //   page: state.page,
    //   limit: state.itemsPerPage,
    //   filterParam: {
    //     ...removeNullValues(state.rawFilter),
    //     category_name: state.productCategory,
    //   },
    //   sort: state.sort.sort,
    //   sortDir: state.sort.sortDir,
    //   allowedCompanies: [],
    // };

    // if (isReseller) {
    //   body.endCustomer = state.endCustomer;
    // }

    const response = mock;

    actions.setTableRows(response.rows);
    actions.setTotalRows(response.total);
    actions.setLoading(false);
  };

  return { getInventory };
};
