import {useContext, useState} from "react";
import useTicketTypes from "../../../components/shared/hooks/tickets/useTicketTypes";
import StoreContext from "../../../context/StoreContext";

export const useTicketPopup = () => {
  const {getTranslatedTicketOptions, getFaultTicketOption} = useTicketTypes();
  const ticketTypes = getTranslatedTicketOptions();
  const ticketTypeFault = getFaultTicketOption();
  const [ticketList, setTicketList] = useState(ticketTypes);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRaw, setRaw] = useState({});

  const isReseller = false;

  const {
    openTicketModal: {openCreateTicketModal},
  } = useContext(StoreContext);

  const handleClick = (event, rawData) => {
    // console.log("rawData ", rawData, ticketList);
    if (!rawData.space_id || rawData.space_id === null) {
      setTicketList(ticketTypeFault);
    } else {
      setTicketList(ticketTypes);
    }
    setRaw(rawData);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setRaw({});
    setAnchorEl(null);
  };

  const showTicketsModal = (event, modal) => {
    let ticketInitData = {};
    if (Object.keys(selectedRaw).length > 0) {
      ticketInitData = {
        initCompanyId: isReseller
          ? selectedRaw.end_customer_id: "",
        initOperatingSite: selectedRaw.location_id,
        initServiceId: selectedRaw.project_task_id,
        initServiceName: selectedRaw.service_name,
        initSpaceId: selectedRaw.space_id_id ? selectedRaw.space_id_id : false,
        initProductName: selectedRaw.product_name,
        // initServiceId: 105712
      };
    }
    if (modal.id === "site-access") {
      // console.log({selectedRaw})
      // ticketInitData.initServiceId = [103556]
      ticketInitData.initServiceId = [selectedRaw.project_task_id];
    }
    openCreateTicketModal(modal, ticketInitData);
    // console.log("showTicketsModal....", event.target.id);
    setRaw({});
    setAnchorEl(null);
  };

  return {
    handleClick,
    handleClose,
    ticketList,
    anchorEl,
    showTicketsModal,
  };
};
