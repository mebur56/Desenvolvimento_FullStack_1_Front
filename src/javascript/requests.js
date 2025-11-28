const API_URL = "http://localhost:5000";


function getAllSchedules() {
    const url = `${API_URL}/schedules`;

    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function searchSchedule(searchInput) {
    const url = `${API_URL}/search_schedule?search=${searchInput}`
    return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function newSchedule(schedule) {
    const url = `${API_URL}/schedule`
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(schedule)
    }).then(response => {
        if (response.status == 201) {
            return true
        }
        return false
    }).catch(function (err) {
        console.log('Fetch Error :-S', err);
        return false
    });
}

function removeSchedule(id) {
    const url = `${API_URL}/schedule?id=${id}`

    return fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (response.status = 200) {
            console.log(response)
            return true
        }
    }).catch(function (err) {
        console.log('Error :-S', err);
        return false
    });
}

function updateSchedule(schedule) {
    const url = `${API_URL}/schedule`

        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(schedule)
        }).then(response => {
            console.log(response)
            if (response.status = 200) {
                return true
            }
        }).catch(function (err) {
        console.log('Error :-S', err);
        return false
    });
}




