const url = 'http://localhost:5000/employees';

export const update = (userId, tasks) => {
    return fetch(`${url}/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks),
    })
        .then((res) => res.json())
        .catch((err) => console.log(err));
};
