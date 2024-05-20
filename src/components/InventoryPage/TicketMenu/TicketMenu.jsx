import { Menu, MenuItem } from "@mui/material";

const TicketMenu = ({
  anchorEl,
  open,
  handleClose,
  ticketList,
  showTicketsModal,
}) => {
  const OPTIONS = ["site-access", "remote-hands", "fault", "shipment"];
  return (
    <Menu
      id={"long-menu"}
      MenuListProps={{
        "aria-labelledby": "long-button",
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      transformOrigin={{horizontal: "right", vertical: "top"}}
      anchorOrigin={{horizontal: "left", vertical: "top"}}
    >
      {ticketList.map((ticket, index) => (
        <MenuItem
          data-cy="inventory-mui-menu-item-88114"
          hidden={!OPTIONS.includes(ticket.id)}
          key={ticket.id}
          id={ticket.id}
          value={ticket.id}
          onClick={(e) => showTicketsModal(e, ticket)}
          disabled={!ticket.active}
        >
          {ticket.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default TicketMenu;
