export const pageInitialState = {
  open: true,
  isOpenRightDrawer: true,
  isArrowActive: false,
  openMobileNavMenu: false,
  openMobileRightMenu: false,
  companyList: [],
  selectedCompanies: [],
  activeCountry: "",
  countryList: [],
};

const actionTypes = {
  SET_OPEN: "SET_OPEN",
  SET_OPEN_RIGHT_DRAWER: "SET_OPEN_RIGHT_DRAWER",
  SET_ARROW_ACTIVE: "SET_ARROW_ACTIVE",
  SET_OPEN_MOBILE_NAV_MENU: "SET_OPEN_MOBILE_NAV_MENU",
  SET_OPEN_MOBILE_RIGHT_MENU: "SET_OPEN_MOBILE_RIGHT_MENU",
  SET_COMPANY_LIST: "SET_COMPANY_LIST",
  SET_SELECTED_COMPANIES: "SET_SELECTED_COMPANIES",
  SET_ACTIVE_COUNTRY: "SET_ACTIVE_COUNTRY",
  SET_COUNTRY_LIST: "SET_COUNTRY_LIST",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_OPEN:
      return {
        ...state,
        open: action.payload,
      };
    case actionTypes.SET_OPEN_RIGHT_DRAWER:
      return {
        ...state,
        isOpenRightDrawer: action.payload,
      };
    case actionTypes.SET_ARROW_ACTIVE:
      return {
        ...state,
        isArrowActive: action.payload,
      };
    case actionTypes.SET_OPEN_MOBILE_NAV_MENU:
      return {
        ...state,
        openMobileNavMenu: action.payload,
      };
    case actionTypes.SET_OPEN_MOBILE_RIGHT_MENU:
      return {
        ...state,
        openMobileRightMenu: action.payload,
      };
    case actionTypes.SET_COMPANY_LIST:
      return {
        ...state,
        companyList: action.payload,
      };
    case actionTypes.SET_SELECTED_COMPANIES:
      return {
        ...state,
        selectedCompanies: action.payload,
      };
    case actionTypes.SET_ACTIVE_COUNTRY:
      return {
        ...state,
        activeCountry: action.payload,
      };
    case actionTypes.SET_COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload,
      };
    default:
      return state;
  }
};
