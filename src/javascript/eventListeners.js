const dateInput = document.getElementById("addDate");
const dateInputModal = document.getElementById("editDate");

dateInput.addEventListener("input", function (e) {
    date = maskFormatDate(e.target.value);
    e.target.value = date;
});

dateInputModal.addEventListener("input", function (e) {
    date = maskFormatDate(e.target.value);
    e.target.value = date;
});

