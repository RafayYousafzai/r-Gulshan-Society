export default function getCurrentDateTime() {
  // Get the current date and time
  const currentDate = new Date();

  // Define month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Format the date to "Mon dd, yyyy"
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  // Format the time to "hh:mm AM/PM"
  let hours = currentDate.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");

  // Return the formatted date and time string as an object
  return {
    date: `${month} ${day}, ${year}`,
    time: `${hours}:${minutes} ${ampm}`,
  };
}

// Example usage:
// console.log(getCurrentDateTime());
