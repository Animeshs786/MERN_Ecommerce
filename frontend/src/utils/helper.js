export const currencyFormat = (amount) => {
  const value = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return value;
};

export const dateFormat = (inputDate) => {
  const date = new Date(inputDate);

  const options = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
};
