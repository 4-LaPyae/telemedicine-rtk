//birthday
export const dateFormatter = (inputDateString = null) => {
  // Create a Date object from the input date string
  const inputDate = new Date(inputDateString);

  // Get the components of the date
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(inputDate.getDate()).padStart(2, "0");

  // Format the date in "YYYY-MM-DD" format
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
//end

export const monthDayYearFormatter = (inputDate = null) => {
  // const parts = inputDate?.split("-");
  // const year = parts[0];
  // const month = parts[1];
  // const day = parts[2];
  // const months = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  //   "September",
  //   "October",
  //   "November",
  //   "December",
  // ];
  // const formattedDate = `${months[parseInt(month) - 1]} ${parseInt(
  //   day
  // )}, ${year}`;
  // return formattedDate;
  const date = new Date(inputDate);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const registerDateFormatter = (inputDate = null) => {
  // Original date string

  // Create a new Date object from the original date string
  var originalDate = new Date(inputDate);

  // Get the day, month, and year components
  var day = originalDate.getUTCDate();
  var month = originalDate.getUTCMonth() + 1; // Adding 1 because months are zero-based
  var year = originalDate.getUTCFullYear();

  // Format the date in the desired format (DD/MM/YYYY)
  var formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};
