export const changeDateTime = (date) => {
    let parts = date.split(" ");

    // Split the date part into year, month, and day
    let dateParts = parts[0].split("-");
    let year = dateParts[0];
    let month = dateParts[1];
    let day = dateParts[2];

    // Create the new formatted date string
    let newDateString = day + "-" + month + "-" + year;
    return { date: newDateString, time: parts[1] };
};

// Input date-time string
export const ChangeDate = (date) => {
    const parsedDate = new Date(date);

    const day = parsedDate.getUTCDate();
    const month = parsedDate.getUTCMonth() + 1;
    const year = parsedDate.getUTCFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}-${
        month < 10 ? "0" : ""
    }${month}-${year}`;
    return formattedDate;
};

export const currentDateandTime = () => {
    const currentDate = new Date();

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

    const month = monthNames[currentDate.getMonth()];
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedDateTime = `${month}-${day}-${year}-${hours}-${minutes}-${seconds}`;

    // console.log(formattedDateTime);
    return formattedDateTime;
};
