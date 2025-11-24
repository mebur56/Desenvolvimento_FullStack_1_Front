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
loadSchedules()

function formatDate(dateStr) {
    const [datePart, timePart] = dateStr.split(" ");
    const [year, month, day] = datePart.split("-");
    return `${day}/${month}/${year} ${timePart}`;
}

function clearTable() {
    const table = document.getElementById("tabela_agenda");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}


function loadSchedules() {
    clearTable()
    getAllSchedules().then(response => {
        response.forEach(schedule => {
            populateTable(schedule)
        });
    });
}

function populateTable(schedule) {
    const table = document.getElementById("tabela_agenda");
    const newRow = table.insertRow();
    const cellTitle = newRow.insertCell(0);
    const cellDate = newRow.insertCell(1);
    const cellDescription = newRow.insertCell(2);
    const cellActions = newRow.insertCell(3);


    cellTitle.textContent = schedule.title;
    cellDate.textContent = formatDate(schedule.date);;
    cellDescription.textContent = schedule.description;

    const editBtn = document.createElement("button");
    editBtn.id = `edit${schedule.id}`
    editBtn.textContent = "Editar";
    editBtn.classList.add("btn-edit");
    editBtn.onclick = () => openModal(schedule);

    const deleteBtn = document.createElement("button");
    deleteBtn.id = `delete${schedule.id}`
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("btn-delete");
    deleteBtn.onclick = () => deleteSchedule(schedule.id);

    cellActions.appendChild(editBtn);
    cellActions.appendChild(deleteBtn);
}


async function addSchedule() {
    const dateStr = document.getElementById("dateInput").value;
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("/");
    const formatted = `${year}-${month}-${day} ${timePart}`;


    const schedule = {
        title: document.getElementById("titleInput").value,
        date: formatted,
        description: document.getElementById("descriptionInput").value
    }

    success = await newSchedule(schedule)
    if (success) {
        loadSchedules();
    }
}

function deleteSchedule(id) {
    success = removeSchedule(id);
    if (success) {
        loadSchedules()
    }
}

let currentEditingId = null
const editModal = document.getElementById("editModal");
function openModal(schedule) {
    currentEditingId = schedule.id;
    document.getElementById("editTitle").value = schedule.title;
    document.getElementById("editDate").value = maskFormatDate(formatDate(schedule.date));
    document.getElementById("editDescription").value = schedule.description;

    editModal.style.display = "block";
}

function closeModal() {
    document.getElementById("editTitle").value = "";
    document.getElementById("editDate").value = "";
    document.getElementById("editDescription").value = "";
    editModal.style.display = "none";
};

async function editSchedule() {
    const dateStr = document.getElementById("editDate").value;
    const [datePart, timePart] = dateStr.split(" ");
    const [day, month, year] = datePart.split("/");
    const formatted = `${year}-${month}-${day} ${timePart}`;
    title = document.getElementById("editTitle").value
    description = document.getElementById("editDescription").value

    schedule = {
        id: currentEditingId,
        title,
        date: formatted,
        description
    }
    success = await updateSchedule(schedule)
    if (success) {
        loadSchedules()
    }
    closeModal()
}

window.onclick = (event) => {
    if (event.target == editModal) {
        closeModal()
    }
};