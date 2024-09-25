const getDateInSingapore = (date: string): string => {
  // Adjusts the date to the Singapore timezone and returns it in 'YYYY-MM-DD' string format
  return new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Asia/Singapore",
  });
};
const formatDateForInput = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Converts the date to 'YYYY-MM-DD'
};

export { getDateInSingapore, formatDateForInput };
