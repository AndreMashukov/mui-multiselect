import { useReducer } from "react";

// const {state, actions} = useTablePageReducer({
//   extraReducers: {
//     setProductCategory: (state, action) => ({
//       ...state,
//       productCategory: action.payload,
//     }),
//   },
//   extraInitialState: {
//     sort: {
//       sort: "installed_date",
//       sortDir: "desc",
//     },
//     rawFilter: {
//       service_name: null,
//       location_name: null,
//       product_name: null,
//       // create_date: null,
//       // request_date: null,
//       status: ["in service"],
//       category: null,
//     },
//     productCategory: ["CAB", "POW0", "CAG", "OFC", "RMH"],
//   },
// });

export const useTablePageReducer = ({
  tableName,
  defaultSort,
  defaultSettings,
  defaultColumnOrder,
  defaultHiddenColumns,
  extraReducers,
  extraInitialState,
  version,
}) => {
  const getSettingFromLocalStorage = () => {
    try {
      const storedSettings = JSON.parse(localStorage.getItem(tableName));
      if (
        !storedSettings ||
        storedSettings.version !== version ||
        !storedSettings.version
      ) {
        const defaultData = {
          version,
          data: defaultSettings,
          sort: defaultSort,
          columnOrder: defaultColumnOrder,
          hiddenColumns: defaultHiddenColumns,
        };
        localStorage.setItem(tableName, JSON.stringify(defaultData));
        return defaultData;
      }
      return storedSettings;
    } catch (err) {
      console.log(err);
      return {
        version,
        data: defaultSettings,
        sort: defaultSort,
        columnOrder: defaultColumnOrder,
        hiddenColumns: defaultHiddenColumns,
      };
    }
  };

  const TABLE_PAGE_ACTION = {
    SET_TABLE_NAME: "SET_TABLE_NAME",
    SET_ITEMS_PER_PAGE: "SET_ITEMS_PER_PAGE",
    SET_PAGE: "SET_PAGE",
    SET_SORT: "SET_SORT",
    ADD_RAW_FILTER: "ADD_RAW_FILTER",
    REMOVE_RAW_FILTER: "REMOVE_RAW_FILTER",
    SET_TABLE_ROWS: "SET_TABLE_ROWS",
    SET_TOTAL_ROWS: "SET_TOTAL_ROWS",
    SET_LOADING: "SET_LOADING",
    SET_SETTINGS: "SET_SETTINGS",
    SET_SELECTORS: "SET_SELECTORS",
    SET_COLUMN_ORDER: "SET_COLUMN_ORDER",
    SET_SHOW_HIDE_COLUMN_MODAL: "SET_SHOW_HIDE_COLUMN_MODAL",
    SET_HIDDEN_COLUMNS: "SET_HIDDEN_COLUMNS",
  };
  const setTableName = (state, action) => ({
    ...state,
    tableName: action.payload,
  });

  const setItemsPerPageReducer = (state, action) => ({
    ...state,
    itemsPerPage: action.payload,
  });

  const setPageReducer = (state, action) => ({
    ...state,
    page: action.payload,
  });

  const setSortReducer = (state, action) => ({
    ...state,
    sort: action.payload,
  });

  const addRawFilterReducer = (state, action) => {
    const { slice, value } = action.payload;
    const newState = { ...state };
    newState.rawFilter[slice] = value;
    return newState;
  };

  const removeRawFilterReducer = (state, action) => {
    const slice = action.payload;
    const newState = { ...state };
    newState.rawFilter[slice] = null;
    return newState;
  };

  const setTableRowsReducer = (state, action) => ({
    ...state,
    tableRows: action.payload,
  });

  const setTotalRowsReducer = (state, action) => ({
    ...state,
    totalRows: action.payload,
  });

  const setLoadingReducer = (state, action) => ({
    ...state,
    loading: action.payload,
  });

  const setSettings = (state, actions) => ({
    ...state,
    settings: actions.payload,
  });

  const setSelectors = (state, actions) => ({
    ...state,
    selectors: actions.payload,
  });

  const setColumnOrder = (state, actions) => ({
    ...state,
    columnOrder: actions.payload,
  });

  const setShowHideColumnsModal = (state, actions) => ({
    ...state,
    showHideColumnsModal: actions.payload,
  });
  
  const setHiddenColumns = (state, actions) => ({
    ...state,
    hiddenColumns: actions.payload,
  })

  const tableReducer = (state, action) => {
    switch (action.type) {
      case TABLE_PAGE_ACTION.SET_TABLE_NAME:
        return setTableName(state, action);
      case TABLE_PAGE_ACTION.SET_ITEMS_PER_PAGE:
        return setItemsPerPageReducer(state, action);
      case TABLE_PAGE_ACTION.SET_PAGE:
        return setPageReducer(state, action);
      case TABLE_PAGE_ACTION.SET_SORT:
        return setSortReducer(state, action);
      case TABLE_PAGE_ACTION.ADD_RAW_FILTER:
        return addRawFilterReducer(state, action);
      case TABLE_PAGE_ACTION.REMOVE_RAW_FILTER:
        return removeRawFilterReducer(state, action);
      case TABLE_PAGE_ACTION.SET_TABLE_ROWS:
        return setTableRowsReducer(state, action);
      case TABLE_PAGE_ACTION.SET_TOTAL_ROWS:
        return setTotalRowsReducer(state, action);
      case TABLE_PAGE_ACTION.SET_LOADING:
        return setLoadingReducer(state, action);
      case TABLE_PAGE_ACTION.SET_SETTINGS:
        return setSettings(state, action);
      case TABLE_PAGE_ACTION.SET_SELECTORS:
        return setSelectors(state, action);
      case TABLE_PAGE_ACTION.SET_COLUMN_ORDER:
        return setColumnOrder(state, action);
      case TABLE_PAGE_ACTION.SET_SHOW_HIDE_COLUMN_MODAL:
        return setShowHideColumnsModal(state, action);
      case TABLE_PAGE_ACTION.SET_HIDDEN_COLUMNS:
        return setHiddenColumns(state, action);
      default:
        // eslint-disable-next-line no-prototype-builtins
        if (extraReducers && extraReducers.hasOwnProperty(action.type)) {
          return extraReducers[action.type](state, action);
        }
        return state;
    }
  };

  const getTableActions = (dispatch) => ({
    setTableName: (value) =>
      dispatch({ type: TABLE_PAGE_ACTION.SET_TABLE_NAME, payload: value }),
    setItemsPerPage: (value) =>
      dispatch({ type: TABLE_PAGE_ACTION.SET_ITEMS_PER_PAGE, payload: value }),
    setPage: (value) =>
      dispatch({ type: TABLE_PAGE_ACTION.SET_PAGE, payload: value }),
    addRawFilter: ({ slice, value }) =>
      dispatch({
        type: TABLE_PAGE_ACTION.ADD_RAW_FILTER,
        payload: { slice, value },
      }),
    removeRawFilter: (slice) =>
      dispatch({
        type: TABLE_PAGE_ACTION.REMOVE_RAW_FILTER,
        payload: slice,
      }),
    setTableRows: (invoices) =>
      dispatch({ type: TABLE_PAGE_ACTION.SET_TABLE_ROWS, payload: invoices }),
    setTotalRows: (total) =>
      dispatch({ type: TABLE_PAGE_ACTION.SET_TOTAL_ROWS, payload: total }),
    setLoading: (loading) =>
      dispatch({ type: TABLE_PAGE_ACTION.SET_LOADING, payload: loading }),
    setSort: (column) =>
      dispatch({
        type: TABLE_PAGE_ACTION.SET_SORT,
        payload: {
          sort: column.lable,
          sortDir: column.sortDirection,
        },
      }),
    setSettings: (settings) =>
      dispatch({
        type: TABLE_PAGE_ACTION.SET_SETTINGS,
        payload: settings,
      }),
    setSelectors: (selectors) =>
      dispatch({
        type: TABLE_PAGE_ACTION.SET_SELECTORS,
        payload: selectors,
      }),
    setColumnOrder: (columnOrder) =>
      dispatch({
        type: TABLE_PAGE_ACTION.SET_COLUMN_ORDER,
        payload: columnOrder,
      }),
    setShowHideColumnsModal: (flag) => 
      dispatch({
        type: TABLE_PAGE_ACTION.SET_SHOW_HIDE_COLUMN_MODAL,
        payload: flag,
      }),
    setHiddenColumns: (columns) =>
      dispatch({
        type: TABLE_PAGE_ACTION.SET_HIDDEN_COLUMNS,
        payload: columns,
      }),
  });

  const INITIAL_STATE = {
    tableName,
    itemsPerPage: 10,
    page: 1,
    tableRows: [],
    totalRows: 0,
    loading: false,
    settings: getSettingFromLocalStorage().data,
    sort: getSettingFromLocalStorage().sort,
    selectors: [],
    columnOrder: getSettingFromLocalStorage().columnOrder,
    showHideColumnsModal: false,
    hiddenColumns: getSettingFromLocalStorage().hiddenColumns,
    ...extraInitialState,
  };

  const [state, dispatch] = useReducer(tableReducer, INITIAL_STATE);

  const actions = getTableActions(dispatch);
  const extraActions = extraReducers
    ? Object.keys(extraReducers).reduce((acc, key) => {
        acc[key] = (payload) => dispatch({ type: key, payload });
        return acc;
      }, {})
    : {};

  return { state, actions: { ...actions, ...extraActions } };
};
