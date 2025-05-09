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

// take any date format and return the string  ex- Thursday, January 2, 2025
export const formatDateString = (dateString) => {
  if (!dateString) return;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
};
// format iso 8061 to read
export const formatDateTimeForCalendar = (dateTime) => {
  const year = dateTime.slice(0, 4);
  const month = dateTime.slice(4, 6) - 1;
  const day = parseInt(dateTime.slice(6, 8), 10);

  const date = new Date(Date.UTC(year, month, day));

  const monthName = date.toLocaleString("en-US", { month: "long" });

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = day + getDaySuffix(day);

  return `${monthName} ${dayWithSuffix}`;
};
