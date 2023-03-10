const url = 'http://localhost:5000/employees';

export function getAllEmployees() {
    return fetch(url)
        .then((res) => res.json())
        .catch((err) => console.log(err));
}
