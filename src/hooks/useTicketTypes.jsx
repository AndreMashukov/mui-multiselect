/* eslint-disable import/no-extraneous-dependencies */
import {useTranslation} from "react-i18next";

export const TICKET_TYPES = {
  SITE_ACCESS: "site-access",
  REMOTE_HANDS: "remote-hands",
  FAULT: "fault",
  SHIPMENT: "shipment",
  INVOICE_DISPUTE: "invoice-dispute",
};

const DEFAULT_MIN_WIDTH = "1000px";

const useTicketTypes = () => {
  const {t} = useTranslation();
  const isPermitted = () => true;

  const TICKET_OPTIONS = [
    {
      id: TICKET_TYPES.SITE_ACCESS,
      name: t("create-ticket.site-access.title"),
      formWidth: DEFAULT_MIN_WIDTH,
      active: isPermitted(),
    },
    {
      id: TICKET_TYPES.REMOTE_HANDS,
      name: t("create-ticket.remote-hands.title"),
      formWidth: DEFAULT_MIN_WIDTH,
      formTitle: t("create-ticket.remote-hands.form-title"),
      active: isPermitted(),
    },
    {
      id: TICKET_TYPES.SHIPMENT,
      name: t("create-ticket.shipment.title"),
      formWidth: DEFAULT_MIN_WIDTH,
      active: isPermitted(),
    },
    {
      id: TICKET_TYPES.FAULT,
      name: t("create-ticket.fault-ticket.title"),
      formWidth: DEFAULT_MIN_WIDTH,
      formTitle: t("create-ticket.fault-ticket.form-title"),
      active: isPermitted(),
    },
    {
      id: TICKET_TYPES.INVOICE_DISPUTE,
      name: t("create-ticket.invoice_query.title"),
      formWidth: "500px",
      formTitle: t("create-ticket.invoice_query.form-title"),
      active: isPermitted(),
    },
  ];

  const TICKET_OPTIONS_FAULT = [
    {
      id: TICKET_TYPES.FAULT,
      name: t("create-ticket.fault-ticket.title"),
      formWidth: "500px",
      formTitle: t("create-ticket.fault-ticket.form-title"),
      active: isPermitted(),
    },
  ];

  return {
    getTranslatedTicketOptions: () => TICKET_OPTIONS,
    getFaultTicketOption: () => TICKET_OPTIONS_FAULT,
  };
};

export default useTicketTypes;
