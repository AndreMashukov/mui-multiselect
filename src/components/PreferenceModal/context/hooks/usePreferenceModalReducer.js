import useBaseReducer from "../../../../hooks/useBaseReducer";

export const usePrefernceModalReducer = () => {

  const initialState = {
    selectedCountry: null,
    selectedCompany: null,
    selectedLayout: null,
  };

  const { state, actions } = useBaseReducer({
    initialState,
  });

  return { state, actions };
};
