export const formatISOToGoogleCalendar = (isoString) => {
  const date = new Date(isoString);

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type).value;

  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hours = get("hour");
  const minutes = get("minute");
  const seconds = get("second");

  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};
