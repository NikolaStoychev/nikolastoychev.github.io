import { clearUserData, getUserData, setUserData } from '../util.js';
import { notify } from '../common/notification.js';

const host = 'https://eu-api.backendless.com/DF098606-98EB-420F-FF58-B4FE2652E000/FD8822E7-AB00-4AA7-A05D-9C0F9DFA42A4';

async function request(url, options) {
    try {
        const response = await fetch(host + url, options);

        if (response.status != 200) {
            clearUserData();
            const err = await response.json();
            throw new Error(err.message);
        }

        return response.json();
    } catch (err) {
        notify(err.message);
        throw err;
    }
}

function createOptions(method = 'get', data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData != null) {
        options.headers['user-token'] = userData.token;
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const response = await request('/users/login', createOptions('post', { login: email, password }));
    const userData = {
        email: response.email,
        name: response.name,
        token: response["user-token"],
        id: response.ownerId
    };

    setUserData(userData);
}

export async function register(email, password, name) {
    const response = await request('/users/register', createOptions('post', { email, password, name }));
    await login(response.email, password)
}

export async function logout() {
    try {
        const response = await fetch(host + '/users/logout', createOptions());

        if (response.status != 200) {
            const err = await response.json();
            throw new Error(err.message);
        } else {
            clearUserData();
            return response;
        }
    } catch (err) {
        notify(err.message);
        throw err;
    }
}