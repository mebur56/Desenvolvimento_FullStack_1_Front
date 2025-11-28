const dateInput = document.getElementById("dateInput");
const dateInputModal = document.getElementById("editDate");

dateInput.addEventListener("input", function (e) {
    date = maskFormatDate(e.target.value);
    e.target.value = date;
});

dateInputModal.addEventListener("input", function (e) {
    date = maskFormatDate(e.target.value);
    e.target.value = date;
});

window.onclick = (event) => {
    if (event.target == editModal) {
        closeModal()
    }
};