export function dateFormat(dateString, deliminator = "-") {
  try {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    return `${year}${deliminator}${month > 9 ? month + 1 : "0" + (month + 1)
      }${deliminator}${day > 9 ? day : "0" + day}`;
  } catch (error) {
    return `-----`;
  }
}

export function dateAndTimeFormat(dateString, deliminator = "/") {
  try {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'long' });
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours();
    const minute = dateObj.getMinutes();
    return `${day > 9 ? day : 0 + day } ${month} ${year} ${" "} - 
    ${hour > 12 ? "0" + (hour - 12) : hour}:${minute > 9 ? minute : "0" + (minute)} ${hour > 12 ? "PM" : "AM"}
      `;
  } catch (error) {
    return `-----`;
  }
}
