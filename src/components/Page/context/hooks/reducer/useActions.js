const useActions = (dispatch) => {
  const setOpen = (flag) => {
    dispatch({type: "SET_OPEN", payload: flag});
  };
  const setOpenRightDrawer = (flag) => {
    dispatch({type: "SET_OPEN_RIGHT_DRAWER", payload: flag});
  };
  const setArrowActive = (flag) => {
    dispatch({type: "SET_ARROW_ACTIVE", payload: flag});
  };
  const setOpenMobileNavMenu = (flag) => {
    dispatch({type: "SET_OPEN_MOBILE_NAV_MENU", payload: flag});
  };
  const setOpenMobileRightMenu = (flag) => {
    dispatch({type: "SET_OPEN_MOBILE_RIGHT_MENU", payload: flag});
  };
  const setCompanyList = (list) => {
    dispatch({type: "SET_COMPANY_LIST", payload: list});
  };
  const setSelectedCompanies = (list) => {
    dispatch({type: "SET_SELECTED_COMPANIES", payload: list});
  };
  const setActiveCountry = (country) => {
    dispatch({type: "SET_ACTIVE_COUNTRY", payload: country});
  };
  const setCountryList = (list) => {
    dispatch({type: "SET_COUNTRY_LIST", payload: list});
  };

  return {
    setOpen,
    setOpenRightDrawer,
    setArrowActive,
    setOpenMobileNavMenu,
    setOpenMobileRightMenu,
    setCompanyList,
    setSelectedCompanies,
    setActiveCountry,
    setCountryList,
  };
};

export default useActions;
