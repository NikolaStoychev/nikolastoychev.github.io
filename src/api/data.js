import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

// SPA specifics
const endpoints = {
    getPage: '/data/animesData?pageSize=3&offset=',
    count: '/data/animesData?props=Count(title)',
    create: '/data/animesData',
    latest: '/data/animesData?pageSize=3&sortBy=yearTo%20desc%20',
    byId: (id) => `/data/animesData/${id}`,
    byTitle: (title) => `/data/animesData?where=title%20LIKE%20%27%25${title}%25%27`

};
const pageSize = 3;

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function getPage(page) {
    const [data, count] = await Promise.all([
        api.get(endpoints.getPage + (page - 1) * pageSize),
        api.get(endpoints.count)
    ]);

    return {
        data,
        pages: Math.ceil(count[0].count / pageSize)
    };
}

export async function getAll() {
    return api.get(endpoints.count);
}

export async function getSearchByTitle(title) {
    return api.get(endpoints.byTitle(encodeURI(title)));
}

export async function getById(id) {
    return api.get(endpoints.byId(id));
}

export async function deleteById(id) {
    return api.del(endpoints.byId(id));
}

export async function editById(id, data) {
    return api.put(endpoints.byId(id), data);
}

export async function getLatest() {
    return api.get(endpoints.latest);
}