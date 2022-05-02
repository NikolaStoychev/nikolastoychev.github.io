import { register } from "../api/data.js";
import { registerTemplate } from '../templates/registerTemplate.js';
import { notify } from '../common/notification.js';

export function showRegisterPage(ctx) {
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const name = formData.get('nickname').trim();
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repeatPass = formData.get('confirm-password').trim();

        try {
            if (email == '' || password == '' || name == '') {
                throw new Error('All fields are mandatory');
            }

            if (password != repeatPass) {
                throw new Error('The Password and Repeat dont match!');
            }

            await register(email, password, name);
            ctx.updateUserNav();
            ctx.page.redirect('/home');
        } catch (err) {
            notify(err.message);
        }
    }
}