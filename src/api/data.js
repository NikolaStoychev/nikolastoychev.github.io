import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

// SPA specifics
const endpoints = {
    create: '/data/animesData',
    all: '/data/animesData',
    latest: '/data/animesData?pageSize=3&sortBy=yearTo%20desc%20',
    byId: (id) => `/data/animesData/${id}`
        // byGameId: (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
        // createComment: '/data/comments'
}

export async function create(data) {
    return api.post(endpoints.create, data);
}

export async function getAll() {
    return api.get(endpoints.all);
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

export async function getCommentsByGameId(gameId) {
    return api.get(endpoints.byGameId(gameId));
}

export async function createComment(data) {
    return api.post(endpoints.createComment, data);
}