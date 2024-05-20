export const useSelectEndCustomer = ({actions}) => {

  const handleChangeCustomer = (value) => {
    let endCustomerIds = [];

    if (value !== "all") {
      endCustomerIds = [parseInt(value.odoo_id, 10)];
    } else {
      endCustomerIds = []
    }

    actions.setEndCustomer(endCustomerIds);
  };

  return {handleChangeCustomer};
};
