const generateTitleItem = (str) => {
  const day = new Date();
  const date = day.getDate();
  const month = (day.getMonth() % 12) + 1;
  const year = day.getFullYear();
  const hour = day.getHours();
  const min = day.getMinutes();
  const second = day.getSeconds();

  return `Untitled ${str} ${date} ${month} ${year} ${hour} ${min} ${second}`;
};

const generateTitleGroup = () => {
  return 'Untitled Group';
};

export { generateTitleItem, generateTitleGroup };
