export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
};
