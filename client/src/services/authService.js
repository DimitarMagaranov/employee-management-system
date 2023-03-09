const url = 'http://localhost:5000/employees';

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

export function getOne(id) {
    return fetch(`${url}/${id}`)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}