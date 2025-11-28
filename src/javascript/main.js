
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
    editBtn.onclick = () => openEditModal(schedule);

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


async function searchButton(){
    const searchInput = document.getElementById("searchInput").value
    if(!searchInput){
        loadSchedules();
        return;
    }
    schedules = await searchSchedule(searchInput)
    clearTable();
    if (schedules.length>0) {
        schedules.forEach(schedule =>{
            populateTable(schedule);
        });
    }
}

async function addSchedule() {
    const dateInput = document.getElementById("addDate");
    const titleInput = document.getElementById("addTitle");
    const descriptionInput = document.getElementById("addDescription");
    
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
    closeModal()
}

async function deleteSchedule(id) {
    success = await removeSchedule(id);
    if (success == true) {
        loadSchedules()
    }
}

let currentEditingId = null
const editModal = document.getElementById("editModal");
function openEditModal(schedule) {
    currentEditingId = schedule.id;
    document.getElementById("editTitle").value = schedule.title;
    document.getElementById("editDate").value = maskFormatDate(formatDate(schedule.date));
    document.getElementById("editDescription").value = schedule.description;

    editModal.style.display = "block";
}

const addModal = document.getElementById("addModal");
function openAddmodal() {
    addModal.style.display = "block";
}

function closeModal() {
    document.getElementById("editTitle").value = "";
    document.getElementById("editDate").value = "";
    document.getElementById("editDescription").value = "";
    document.getElementById("addTitle").value = "";
    document.getElementById("addDate").value = "";
    document.getElementById("addDescription").value = "";
    editModal.style.display = "none";
    addModal.style.display= "none";
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

window.onclick = (event) => {
    if (event.target == editModal || event.target == addModal) {
        closeModal()
    }
};
