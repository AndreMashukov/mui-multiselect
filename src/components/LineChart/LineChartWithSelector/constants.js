export const NUM_LINES = 3;

export const TIME_SCALE_STEPS_MS = [
  {name: "1 hour", value: 3600000},
  {name: "6 hours", value: 21600000},
  {name: "1 day", value: 86400000},
];

export const generateData = (step) => {
  const data = [];
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 2);
  const endDate = new Date();

  for (let i = startDate; i <= endDate; i.setTime(i.getTime() + step)) {
    data.push({
      date: new Date(i),
      value: Math.floor(Math.random() * 100),
    });
  }

  return data;
};
