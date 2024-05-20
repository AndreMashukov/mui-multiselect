import { useTablePageReducer } from "../../../../../hooks/useTableReducer";

export const useInventoryPageReducer = () => {

  const {state, actions} = useTablePageReducer({
    extraReducers: {
      setProductCategory: (state, action) => ({
        ...state,
        productCategory: action.payload,
      }),
      setEndCustomer: (state, action) => ({
        ...state,
        endCustomer: action.payload,
      }),
    },
    extraInitialState: {
      sort: {
        sort: "installed_date",
        sortDir: "desc",
      },
      rawFilter: {
        service_name: null,
        location_name: null,
        product_name: null,
        // create_date: null,
        // request_date: null,
        status: ["in service"],
        category: null,
      },
      productCategory: ["CAB", "POW0", "CAG", "OFC", "RMH"],
      endCustomer: [],
    },
  });

  return {state, actions};
};
