const API_URL = "https://jsonplaceholder.typicode.com/users";

// DOM Elements
const userTableBody = document.querySelector("#userTable tbody");
const loadingDiv = document.getElementById("loading");
const modal = document.getElementById("userModal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalSpan = document.getElementsByClassName("close")[0];
const addUserForm = document.getElementById("addUserForm");

// 1. Fetch và Render dữ liệu (GET)
async function fetchUsers() {
    try {
        loadingDiv.style.display = "block";
        const response = await fetch(API_URL);

        if (!response.ok) throw new Error("Lỗi kết nối API");

        const users = await response.json();
        renderTable(users);
    } catch (error) {
        console.error("Error:", error);
        alert("Không thể tải danh sách user.");
    } finally {
        loadingDiv.style.display = "none";
    }
}

function renderTable(users) {
    // Xóa dữ liệu cũ
    userTableBody.innerHTML = "";

    users.forEach((user) => {
        const row = document.createElement("tr");
        // Bỏ address và company theo yêu cầu
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

// 2. Xử lý Modal
openModalBtn.onclick = () => (modal.style.display = "block");
closeModalSpan.onclick = () => (modal.style.display = "none");
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = "none";
};

// 3. Validation Inputs
function validateInput(data) {
    let isValid = true;

    // Reset lỗi cũ
    document
        .querySelectorAll(".error-message")
        .forEach((el) => (el.style.display = "none"));

    // Check Name
    if (!data.name.trim()) {
        document.getElementById("error-name").style.display = "block";
        isValid = false;
    }

    // Check Username
    if (!data.username.trim()) {
        document.getElementById("error-username").style.display = "block";
        isValid = false;
    }

    // Check Email (Regex đơn giản)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        document.getElementById("error-email").style.display = "block";
        isValid = false;
    }

    // Check Phone (Chỉ cần có số và độ dài > 9)
    if (data.phone.length < 9) {
        document.getElementById("error-phone").style.display = "block";
        isValid = false;
    }

    return isValid;
}

// 4. Thêm User mới (POST)
addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Lấy dữ liệu từ form
    const newUser = {
        name: document.getElementById("name").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        website: document.getElementById("website").value,
    };

    // Validate
    if (!validateInput(newUser)) return;

    try {
        // Hiển thị trạng thái đang gửi...
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

        // Giả lập thêm vào UI (vì Fake API luôn trả về ID 11)
        createdUser.id = Math.floor(Math.random() * 1000) + 11;

        // Append vào bảng
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${createdUser.id} (New)</td>
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
        // Reset nút bấm
        const submitBtn = document.querySelector(".btn-submit");
        submitBtn.innerText = "Thêm User";
        submitBtn.disabled = false;
    }
});

// Khởi chạy khi load trang
fetchUsers();
