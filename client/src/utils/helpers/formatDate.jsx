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

// take any date format and return the string in short format ex- Nov 2, 2025
export const formatDateStringShort = (dateString) => {
  if (!dateString) return;
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};
// format iso 8061 to read
export const formatDateTimeForCalendar = (dateTime) => {
  if (!dateTime) return "";
  const date = new Date(dateTime);
  if (isNaN(date)) return "";

  const monthName = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

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
