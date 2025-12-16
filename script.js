const API_URL = "https://jsonplaceholder.typicode.com/users";

const userTableBody = document.querySelector("#userTable tbody");
const loadingDiv = document.getElementById("loading");
const modal = document.getElementById("userModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalSpan = document.getElementsByClassName("close")[0];
const addUserForm = document.getElementById("addUserForm");

async function fetchUsers() {
    try {
        loadingDiv.style.display = "block";
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Lỗi kết nối API");

        const users = await response.json();
        const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];
        renderTable([...users, ...localUsers]);
    } catch (error) {
        console.error("Error:", error);
        alert("Không thể tải danh sách user.");
    } finally {
        loadingDiv.style.display = "none";
    }
}

function renderTable(users) {
    userTableBody.innerHTML = "";

    users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
        `;
        userTableBody.appendChild(row);
    });
}

openModalBtn.onclick = () => (modal.style.display = "block");
closeModalSpan.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

function validateInput(data) {
    let isValid = true;

    document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.style.display = "none"));

    if (!data.name.trim()) {
        document.getElementById("error-name").style.display = "block";
        isValid = false;
    }

    if (!data.username.trim()) {
        document.getElementById("error-username").style.display = "block";
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        document.getElementById("error-email").style.display = "block";
        isValid = false;
    }

    if (data.phone.length < 9 || isNaN(data.phone) || !data.phone.trim()) {
        document.getElementById("error-phone").style.display = "block";
        isValid = false;
    }

    return isValid;
}

addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newUser = {
        name: document.getElementById("name").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        website: document.getElementById("website").value,
    };

    if (!validateInput(newUser)) return;

    try {
        const submitBtn = document.querySelector(".btn-submit");
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Đang xử lý...";
        submitBtn.disabled = true;

        const response = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

        if (!response.ok) throw new Error("Lỗi khi thêm user");

        const createdUser = await response.json();

        createdUser.id = userTableBody.rows.length + 1;

        const localUsers = JSON.parse(localStorage.getItem("localUsers")) || [];
        localUsers.push(createdUser);
        localStorage.setItem("localUsers", JSON.stringify(localUsers));

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${createdUser.id}</td>
            <td>${createdUser.name}</td>
            <td>${createdUser.username}</td>
            <td>${createdUser.email}</td>
            <td>${createdUser.phone}</td>
            <td>${createdUser.website}</td>
        `;
        userTableBody.appendChild(row);

        alert("Thêm User thành công!");
        modal.style.display = "none";
        addUserForm.reset();
    } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
        const submitBtn = document.querySelector(".btn-submit");
        submitBtn.innerText = "Thêm User";
        submitBtn.disabled = false;
    }
});

fetchUsers();
