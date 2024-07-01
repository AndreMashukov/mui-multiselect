/* eslint-disable no-prototype-builtins */
import { useReducer } from "react";

const useBaseReducer = ({ initialState }) => {
  const getReducerFunction = (initialState) => {
    return Object.entries(initialState).reduce((acc, [key, value]) => {
      const actionName = `set${key.charAt(0).toUpperCase() + key.slice(1)}`;
      acc[actionName] = (state, action) => ({
        ...state,
        [key]: action.payload,
      });
      return acc;
    }, {});
  };

  const reducerFunctions = getReducerFunction(initialState);

  const baseReducer = (state, action) => {
    if (reducerFunctions && reducerFunctions.hasOwnProperty(action.type)) {
      return reducerFunctions[action.type](state, action);
    }
    return state;
  };

  const [state, dispatch] = useReducer(baseReducer, initialState);

  const actions = reducerFunctions
    ? Object.keys(reducerFunctions).reduce((acc, key) => {
        acc[key] = (payload) => dispatch({ type: key, payload });
        return acc;
      }, {})
    : {};

  return { state, actions };
};

export default useBaseReducer;
