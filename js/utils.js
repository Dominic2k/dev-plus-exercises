export function validateUser(data) {
    const errors = {};
    let isValid = true;

    if (!data.name.trim()) {
        errors.name = true;
        isValid = false;
    }

    if (!data.username.trim()) {
        errors.username = true;
        isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        errors.email = true;
        isValid = false;
    }

    if (data.phone.length < 9 || isNaN(data.phone) || !data.phone.trim()) {
        errors.phone = true;
        isValid = false;
    }

    return { isValid, errors };
}

const STORAGE_KEY = "localUsers";

export function getLocalUsers() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
        return [];
    }
}

export function saveLocalUser(user) {
    const users = getLocalUsers();
    users.push(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
