export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitial = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  let [integerPart, fractionalPart] = num.toString().split(".");

  // Regex for Indian Formatting (Lakhs/Crores)
  // This separates the last 3 digits, then groups the rest in 2s
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

// Update your helper.js as follows:
// utils/helper.js
export const prepareExpenseBarChartData = (data = []) => {
  if (!data || data.length === 0) return [];

  // Grouping by category
  const grouped = data.reduce((acc, item) => {
    const key = item.category || "Other";
    acc[key] = (acc[key] || 0) + (item.amount || 0);
    return acc;
  }, {});

  // Format for Recharts
  return Object.keys(grouped).map((cat) => ({
    month: cat, 
    amount: grouped[cat],
    category: cat,
  }));
};

