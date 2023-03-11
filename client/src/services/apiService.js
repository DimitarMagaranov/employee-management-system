const url = 'http://localhost:5000/employees';

export function getAllEmployees() {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export function create(data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export function getOneEmployee(id) {
    return fetch(`${url}/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}

export const updateEmployee = (id, data) => {
    return fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};