export const formatDate = (dateString) => {
  if (!dateString) return;
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
};
