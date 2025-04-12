const addToCalendarOrOpenMaps = (event, eventType) => {
  event.stopPropagation();
  const eventTitle = event.currentTarget.getAttribute("data-eventTitle");
  const startDateTime = event.currentTarget.getAttribute("data-startDateTime");
  const endDateTime = event.currentTarget.getAttribute("data-endDateTime");
  const eventLocation = event.currentTarget.getAttribute("data-eventLocation");
  if (eventType === "date") {
    const calendarUrl = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      eventTitle
    )}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(eventTitle)}&location=${encodeURIComponent(eventLocation)}`;
    window.open(calendarUrl, "_blank");
  } else if (eventType === "location") {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventLocation)}`;
    window.open(mapsUrl, "_blank");
  }
};

export default addToCalendarOrOpenMaps;
