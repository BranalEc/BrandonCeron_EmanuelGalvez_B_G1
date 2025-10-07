const API_URL = "http://localhost:8080/api/peliculas"

export async function get() {
    const res = await fetch(`${API_URL}/get`)
    return res.json();
}

export async function create(payload) {
    await fetch(`${API_URL}/new`, {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(payload)
    });
}

export async function update(id, payload) {
    await fetch(`${API_URL}/update/${id}`, {
        method: "PUT",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
}

export async function deleteM(id) {
    await fetch(`${API_URL}/delete/${id}`, {
        method: "DELETE",
    });
}