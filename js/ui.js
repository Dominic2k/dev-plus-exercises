export const elements = {
    userTableBody: document.querySelector("#userTable tbody"),
    loadingDiv: document.getElementById("loading"),
    modal: document.getElementById("userModal"),
    openModalBtn: document.getElementById("openModalBtn"),
    closeModalSpan: document.getElementsByClassName("close")[0],
    addUserForm: document.getElementById("addUserForm"),
    submitBtn: document.querySelector(".btn-submit"),
    inputs: {
        name: document.getElementById("name"),
        username: document.getElementById("username"),
        email: document.getElementById("email"),
        phone: document.getElementById("phone"),
        website: document.getElementById("website"),
    },
    errors: {
        name: document.getElementById("error-name"),
        username: document.getElementById("error-username"),
        email: document.getElementById("error-email"),
        phone: document.getElementById("error-phone"),
    },
};

export function toggleLoading(show) {
    elements.loadingDiv.style.display = show ? "block" : "none";
}

export function toggleModal(show) {
    elements.modal.style.display = show ? "block" : "none";
    if (!show) resetForm();
}

export function renderTable(users) {
    elements.userTableBody.innerHTML = users
        .map(
            (user) => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.website}</td>
        </tr>
    `
        )
        .join("");
}

export function showInputErrors(errors) {
    Object.values(elements.errors).forEach((el) => (el.style.display = "none"));

    if (errors.name) elements.errors.name.style.display = "block";
    if (errors.username) elements.errors.username.style.display = "block";
    if (errors.email) elements.errors.email.style.display = "block";
    if (errors.phone) elements.errors.phone.style.display = "block";
}

export function setSubmitLoading(isLoading) {
    if (isLoading) {
        elements.submitBtn.innerText = "Đang xử lý...";
        elements.submitBtn.disabled = true;
    } else {
        elements.submitBtn.innerText = "Thêm User";
        elements.submitBtn.disabled = false;
    }
}

function resetForm() {
    elements.addUserForm.reset();
    Object.values(elements.errors).forEach((el) => (el.style.display = "none"));
}

export function getFormData() {
    const data = {};
    for (const key in elements.inputs) {
        data[key] = elements.inputs[key].value;
    }
    return data;
}
