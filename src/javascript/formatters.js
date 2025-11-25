function maskFormatDate(date) {
    date = date.replace(/\D/g, "");

    if (date.length > 2) {
        date = date.replace(/(\d{2})(\d)/, "$1/$2");
    }
    if (date.length > 5) {
        date = date.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }
    if (date.length > 8) date = date.replace(/(\d{2}\/\d{2}\/\d{4})(\d{1,2})(\d{1,2})?/, "$1 $2:$3");

    return date
}


function formatDate(dateStr) {
    const [datePart, timePart] = dateStr.split(" ");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year} ${timePart}`;
}

function formatDateToUniversal(dateStr) {
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("/");
    const formatted = `${year}-${month}-${day} ${timePart}`;
    return formatted;
}