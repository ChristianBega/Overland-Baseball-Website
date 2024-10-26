export const formatDate = (dateString) => {
  if (!dateString) return;
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
};

export const formatServerTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }
  return "N/A";
};
