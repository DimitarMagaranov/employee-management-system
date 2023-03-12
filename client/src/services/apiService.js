const url = 'http://localhost:5000/employees';

export const getAllEmployees = () => {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const createEmployee = (data) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

export const getOneEmployee = (id) => {
    return fetch(`${url}/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
};

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

export const getTasksByUserId = (id) => {
    return fetch(`${url}/${id}`)
        .then((res) => res.json())
        .then((data) => data.tasks)
        .catch((err) => console.log(err));
};

export const deleteEmployee = (id) => {
    return fetch(`${url}/${id}`, {
        method: 'DELETE',
    })
        .then((res) => res.status)
        .catch((err) => console.log(err));
};
