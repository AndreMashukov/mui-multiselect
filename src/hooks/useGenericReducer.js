import {useReducer} from "react";

// const {state, actions} = useGenericReducer({
//   reducers: {
//     setProductCategory: (state, action) => ({
//       ...state,
//       productCategory: action.payload,
//     }),
//   },
//   initialState: {
//     productCategory: ["CAB", "POW0", "CAG", "OFC", "RMH"],
//   },
// });

export const useGenericReducer = ({reducers, initialState}) => {
  const genericReducer = (state, action) => {
    switch (action.type) {
      default:
        // eslint-disable-next-line no-prototype-builtins
        if (reducers && reducers.hasOwnProperty(action.type)) {
          return reducers[action.type](state, action);
        }
        return state;
    }
  };

  const [state, dispatch] = useReducer(genericReducer, initialState);

  const actions = reducers
    ? Object.keys(reducers).reduce((acc, key) => {
        acc[key] = (payload) => dispatch({type: key, payload});
        return acc;
      }, {})
    : {};

  return {state, actions};
};
