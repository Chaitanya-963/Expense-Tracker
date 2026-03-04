import moment from "moment";
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitial = (name) => {
  if (!name) return "";

   return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  let [integerPart, fractionalPart] = num.toString().split(".");


  let lastThree = integerPart.substring(integerPart.length - 3);
  let otherNumbers = integerPart.substring(0, integerPart.length - 3);

  if (otherNumbers !== "") {
    lastThree = "," + lastThree;
  }

  const formattedInteger =
    otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  if (!data || data.length === 0) return [];

  
  const grouped = data.reduce((acc, item) => {
    const key = item.category || "Other";
    acc[key] = (acc[key] || 0) + (item.amount || 0);
    return acc;
  }, {});


  return Object.keys(grouped).map((cat) => ({
    month: cat,
    amount: grouped[cat],
    category: cat,
  }));
};

export const prepareIncomeBarChartData = (data = []) => {
  if (!data || data.length === 0) return [];

  const grouped = data.reduce((acc, item) => {
    const day = moment(item.date).format("DD MMM");

    acc[day] = (acc[day] || 0) + (item.amount || 0);
    return acc;
  }, {});

  return Object.keys(grouped).map((day) => ({
    date: day, 
    amount: grouped[day],
  }));
};

export const prepareExpenseLineChartData = (data = []) => {
  if (!data || data.length === 0) return [];

  const groupedData = data.reduce((acc, item) => {
    const dateKey = moment(item?.date).format("DD MMM");
    acc[dateKey] = (acc[dateKey] || 0) + (item?.amount || 0);
    return acc;
  }, {});

  return Object.keys(groupedData)
    .map((date) => ({
      date, // Using 'date' is more semantic than 'months' for a daily view
      amount: groupedData[date],
    }))
    .sort((a, b) => moment(a.date, "DD MMM").diff(moment(b.date, "DD MMM")));
};
