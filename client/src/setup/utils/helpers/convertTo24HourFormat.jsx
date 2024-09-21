export const convertTo24HourFormat = (timeString) => {
  if (!timeString) return;
  const [time, modifier] = timeString.split(" "); // Split the time and AM/PM part
  let [hours, minutes] = time.split(":"); // Split hours and minutes

  // Convert hours from string to integer for calculation
  hours = parseInt(hours, 10);

  if (modifier === "PM" && hours !== 12) {
    hours += 12; // Convert PM hours, except for 12 PM
  } else if (modifier === "AM" && hours === 12) {
    hours = 0; // Convert 12 AM to 00
  }

  // Convert hours back to a string and pad with leading zero if necessary
  return `${String(hours).padStart(2, "0")}:${minutes}`; // Return in HH:MM format
};
