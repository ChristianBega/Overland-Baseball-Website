export const formatTime = (isoString, includeAmPm = false) => {
  // Add validation check and logging
  if (!isoString) return "";

  // Parse the ISO string format "YYYY-MM-DDThh:mm"
  const [datePart, timePart] = isoString.split("T");
  if (!timePart) return "";

  const [hours, minutes] = timePart.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));

  return date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeStyle: undefined,
      // Only include AM/PM if includeAmPm is true
      ...(includeAmPm ? {} : { meridiem: false }),
    })
    .replace(/\s(AM|PM)/, includeAmPm ? " $1" : "");
};
