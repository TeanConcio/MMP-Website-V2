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

//Helper function to format null in text fields
export function formatText(text) {
    if (text === null) {
        return "";
    } else {
        return text;
    }
}

//Helper function to duplicate objects (Note: This only handles primitive types, date objects, regular objects, and arrays. All other inputs will result in undefined behavior)
export const duplicate = (data) => {
    if (typeof data === "object") {
        let duplicated;
        if (Object.prototype.toString.call(data) === "[object Array]") {
            duplicated = [];

            for (const entry of data) {
                let handler = {};
                for (const [key, value] of Object.entries(entry)) {
                    if (value === null || value === undefined) {
                        handler[key] = null;
                    } else if (
                        typeof value === "object" &&
                        Object.prototype.toString.call(value) !== "[object Date]"
                    ) {
                        handler[key] = duplicate(value);
                    } else {
                        handler[key] = value;
                    }
                }
                duplicated.push(handler);
            }
        } else {
            duplicated = {};
            for (const [key, value] of Object.entries(data)) {
                if (value === null || value === undefined) {
                    duplicated[key] = null;
                } else if (
                    typeof value === "object" &&
                    Object.prototype.toString.call(value) !== "[object Date]"
                ) {
                    duplicated[key] = duplicate(value);
                } else {
                    duplicated[key] = value;
                }
            }
        }

        return duplicated;
    } else {
        return data;
    }
};
