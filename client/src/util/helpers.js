// Helper functions to format date (YYYY-MM-DD)
export function formatDate(dateString) {
    if (dateString == null) return "";
    // Create a new Date object from the date string
    let date = new Date(dateString);
    // Get the year, month and day from the date object
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Month is zero-based, so add one
    let day = date.getDate();
    // Pad the month and day with leading zeros if needed
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    // Return the formatted date string
    return year + "-" + month + "-" + day;
}

// Helper function to format a name (LAST, first)
export function formatName(last_name, first_name) {
    if (last_name == null || first_name == null) return "";
    return last_name.toUpperCase() + ", " + first_name;
}

// Helper function to format an enum
export function formatEnum(val) {
    if (val == null) return "";
    return val
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

// Helper function to add non-duplicate items to an array
export function addUnique(arr, item) {
    if (arr.indexOf(item) === -1) {
        arr.push(item);
    }
}
