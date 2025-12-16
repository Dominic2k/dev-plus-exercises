import axios from "https://cdn.jsdelivr.net/npm/axios/+esm";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function getUsers() {
    const response = await axios.get(API_URL);
    return response.data;
}

export async function addUser(user) {
    const response = await axios.post(API_URL, user);
    return response.data;
}
