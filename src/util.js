export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(data) {
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData() {
    sessionStorage.removeItem('userData');
}

export function isUser() {
    return getUserData() != null;
}

export function getFormData(formData) {
    return [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, {
        [k]: v
    }), {});
}