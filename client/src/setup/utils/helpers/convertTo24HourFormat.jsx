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
export const convertTo12HourFormat = (timeString) => {
  if (!timeString) return;
  let [hours, minutes] = timeString.split(":"); // Split hours and minutes

  // Convert hours from string to integer for calculation
  hours = parseInt(hours, 10);

  const modifier = hours >= 12 ? "PM" : "AM"; // Determine AM/PM

  // Convert 24-hour format to 12-hour format
  hours = hours % 12 || 12; // Convert 0 to 12 for AM and 12 to 12 for PM

  // Convert hours back to a string and pad with leading zero if necessary
  return `${hours}:${minutes} ${modifier}`; // Return in HH:MM AM/PM format
};
