
loadSchedules()

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

    const editIcon = document.createElement("img")
    editIcon.src = "./svg/edit-icon.svg"
    editIcon.classList.add("edit-icon");

    const editBtn = document.createElement("button");
    editBtn.id = `edit${schedule.id}`
    editBtn.textContent = "Editar";
    editBtn.appendChild(editIcon)
    editBtn.classList.add("btn-edit");
    editBtn.onclick = () => openModal(schedule);

    const deleteIcon = document.createElement("img")
    deleteIcon.src = "./svg/delete-icon.svg"
    deleteIcon.classList.add("delete-icon");

    const deleteBtn = document.createElement("button");
    deleteBtn.id = `delete${schedule.id}`
    deleteBtn.textContent = "Excluir";
    deleteBtn.appendChild(deleteIcon)
    deleteBtn.classList.add("btn-delete");
    deleteBtn.onclick = () => deleteSchedule(schedule.id);

    cellActions.appendChild(editBtn);
    cellActions.appendChild(deleteBtn);
}


async function addSchedule() {
    const dateInput = document.getElementById("dateInput");
    const titleInput = document.getElementById("titleInput");
    const descriptionInput = document.getElementById("descriptionInput");

    const dateStr = dateInput.value
    const formatted = formatDateToUniversal(dateStr);

    const schedule = {
        title: titleInput.value,
        date: formatted,
        description: descriptionInput.value
    }

    success = await newSchedule(schedule)
    if (success == true) {
        titleInput.value = "";
        dateInput.value = "";
        descriptionInput.value = ""
        loadSchedules();
    }
}

async function deleteSchedule(id) {
    success = await removeSchedule(id);
    if (success == true) {
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
    const formatted = formatDateToUniversal(dateStr);
    title = document.getElementById("editTitle").value
    description = document.getElementById("editDescription").value

    schedule = {
        id: currentEditingId,
        title,
        date: formatted,
        description
    }
    success = await updateSchedule(schedule)
    if (success == true) {
        loadSchedules()
    }
    closeModal()
}

