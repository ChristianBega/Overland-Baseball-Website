/**
 * Get the number of days in a month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {number} Number of days in the month
 */
export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Get the day of week for the first day of the month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {number} Day of week (0 = Sunday, 6 = Saturday)
 */
export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Format date as YYYY-MM-DD for comparisons
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDateForComparison = (date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

/**
 * Extract date part from Firebase startDateTime
 * @param {string} startDateTime - Date string in format "YYYY-MM-DDTHH:MM"
 * @returns {string} Date in YYYY-MM-DD format
 */
export const getDateFromStartDateTime = (startDateTime) => {
  if (!startDateTime) return "";
  return startDateTime.split("T")[0];
};

/**
 * Get event time from startDateTime
 * @param {string} startDateTime - Date string in format "YYYY-MM-DDTHH:MM"
 * @returns {string} Time in HH:MM format
 */
export const getTimeFromStartDateTime = (startDateTime) => {
  if (!startDateTime) return "";
  const parts = startDateTime.split("T");
  return parts.length > 1 ? parts[1] : "";
};

/**
 * Filter events for a specific date
 * @param {Array} events - Array of Firebase event objects
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {Array} Filtered events
 */
export const filterEventsForDate = (events, dateString) => {
  return events.filter((event) => {
    if (!event.startDateTime) return false;
    const eventDate = getDateFromStartDateTime(event.startDateTime);
    return eventDate === dateString;
  });
};

/**
 * Get event color based on eventType
 * @param {string} eventType - Event type from Firebase
 * @returns {Object} Color object with text and background colors
 */

export const getEventColor = (eventType) => {
  switch (eventType) {
    case "fundraiser":
      return "#4CBB17";
    // return "#34D399";
    case "featured":
      return "#FBBF24";
    case "regular":
      return "#1555b4";
    // return "#3B82F6";
    case "player":
      return "#EF4444";
    
    default:
      return "#94A3B8";
  }
};
/**
 * Check if a date is in the past
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @param {number} day - The day
 * @returns {boolean} True if the date is in the past
 */
export const isPastDate = (year, month, day) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(year, month, day);
  return date < today;
};

/**
 * Check if a date is today
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @param {number} day - The day
 * @returns {boolean} True if the date is today
 */
export const isToday = (year, month, day) => {
  const today = new Date();
  return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
};

/**
 * Generate an array of week day names
 * @param {string} format - 'short' for 3-letter abbreviation, 'narrow' for single letter
 * @returns {string[]} Array of day names
 */
export const getWeekDayNames = (format = "short") => {
  const days = [];
  const formatOptions = format === "narrow" ? { weekday: "narrow" } : { weekday: "short" };

  for (let i = 0; i < 7; i++) {
    const date = new Date(2023, 0, i + 1);
    days.push(date.toLocaleDateString("en-US", formatOptions));
  }

  return days;
};
