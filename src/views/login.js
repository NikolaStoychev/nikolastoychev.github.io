import { login } from "../api/data.js";
import { loginTemplate } from '../templates/loginTemplate.js';

export function showLoginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();

        if (email == '' || password == '') {
            throw new Error('Email and password are mandatory!')
        }

        await login(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/home');
    }
}