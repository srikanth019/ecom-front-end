const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api/v1';

export function fetchLoggedInUserOrders (userId) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${API_BASE_URL}/orders/?user.id=${userId}`)
        const data = await response.json()
        resolve({ data })
    }
    );
}

export function fetchLoggedInUser (userId) {
    return new Promise(async (resolve) => {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`)
        const data = await response.json()
        resolve({ data })
    }
    );
}
export function updateUser (update) {
    return new Promise(async (resolve) => {
        const response = await fetch('http://localhost:8080/users/' + update.id, {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: { 'content-type': 'application/json' },
        });
        const data = await response.json();
        // TODO: on server it will only return some info of user (not password)
        resolve({ data });
    });
}
