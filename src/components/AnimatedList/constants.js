export const INTERNET_TRAFFIC_LEADER_BOARD = [
  {
    customerId: "cust1",
    customerName: "Golden Lucky Telecom",
    rank: 1,
    traffic: "3.40G",
  },
  {
    customerId: "cust2",
    customerName: "Silver Star Networks",
    rank: 2,
    traffic: "2.90G",
  },
  {
    customerId: "cust3",
    customerName: "Pacific Link Communications",
    rank: 3,
    traffic: "2.70G",
  },
  {
    customerId: "cust4",
    customerName: "Global Internet Services",
    rank: 4,
    traffic: "2.50G",
  },
  {
    customerId: "cust5",
    customerName: "Dragon Digital Solutions",
    rank: 5,
    traffic: "2.20G",
  },
  {
    customerId: "cust6",
    customerName: "Tiger Broadband Co.",
    rank: 6,
    traffic: "2.10G",
  },
  {
    customerId: "cust7",
    customerName: null,
    rank: 7,
    traffic: "2.00G",
  },
  {
    customerId: "cust8",
    customerName: "Four Elements Connect",
    rank: 8,
    traffic: "1.90G",
  },
  {
    customerId: "cust9",
    customerName: null,
    rank: 9,
    traffic: "1.80G",
  },
  {
    customerId: "cust10",
    customerName: "888 Swift Broadband",
    rank: 10,
    traffic: "1.75G",
  },
].map((item) => {
  item.rankChangeDirection = null;
  item.gap = "-0.95G";
  return item;
});

export const COLUMN_WIDTH = {
  rank: "50px",
  customer: "flex",
  traffic: "80px",
  gap: "80px",
};
