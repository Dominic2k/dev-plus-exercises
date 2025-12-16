import { getUsers, addUser } from "./api.js";
import * as UI from "./ui.js";
import * as Utils from "./utils.js";

async function init() {
    try {
        UI.toggleLoading(true);
        const apiUsers = await getUsers();
        const localUsers = Utils.getLocalUsers();
        UI.renderTable([...apiUsers, ...localUsers]);
    } catch (error) {
        console.error("Error:", error);
        alert("Không thể tải danh sách user.");
    } finally {
        UI.toggleLoading(false);
    }
}

UI.elements.openModalBtn.onclick = () => UI.toggleModal(true);
UI.elements.closeModalSpan.onclick = () => UI.toggleModal(false);

window.onclick = (event) => {
    if (event.target == UI.elements.modal) UI.toggleModal(false);
};

UI.elements.addUserForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newUser = UI.getFormData();
    const validation = Utils.validateUser(newUser);

    if (!validation.isValid) {
        UI.showInputErrors(validation.errors);
        return;
    }

    try {
        UI.setSubmitLoading(true);

        const createdUser = await addUser(newUser);

        createdUser.id = Date.now();

        Utils.saveLocalUser(createdUser);

        await init();

        alert("Thêm User thành công!");
        UI.toggleModal(false);
    } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
        UI.setSubmitLoading(false);
    }
});

init();
