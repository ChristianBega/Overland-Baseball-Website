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
  if (!timeString) return "";
  
  // Extract just the time part if it includes timezone (e.g., "20:00:00.000Z")
  const timePart = timeString.split("Z")[0]; // Remove timezone
  const [hours, minutes] = timePart.split(":");
  
  // Convert to integers
  let hour = parseInt(hours, 10);
  const minute = minutes || "00";
  
  // Determine AM/PM
  const period = hour >= 12 ? "PM" : "AM";
  
  // Convert to 12-hour format
  if (hour === 0) {
    hour = 12; // Midnight case
  } else if (hour > 12) {
    hour -= 12; // Afternoon/evening
  }
  
  return `${hour}:${minute} ${period}`;
};
