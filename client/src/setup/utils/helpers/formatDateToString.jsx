export const formatDateToLongString = (dateString) => {
  const date = new Date(dateString);
  const options = { month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
