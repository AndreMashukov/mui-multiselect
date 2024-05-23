import {useReducer} from "react";
import {pageInitialState, reducer} from "./reducer";
import useActions from "./useActions";

const usePageReducer = () => {
  const [state, dispatch] = useReducer(reducer, pageInitialState);
  const actions = useActions(dispatch);

  return {state, actions};
};

export default usePageReducer;
