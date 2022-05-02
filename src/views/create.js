import { create } from '../api/data.js';
import { getFormData } from '../util.js';
import { createTemplate } from '../templates/createTemplate.js';
import { notify } from '../common/notification.js';

export function showCreatePage(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const data = getFormData(formData);

        try {
            if (Object.entries(data).some(([k, v]) => v == '')) {
                throw new Error('All fields are mandatory!')
            }

            data.episodes = Number(data.episodes);
            data.rating = Number(data.rating);

            if (isNaN(data.episodes) || isNaN(data.rating)) {
                throw new Error('Episodes and rating must be numbers!')
            }

            await create(data);

            ctx.page.redirect('/home');
        } catch (error) {
            notify(error.message);
        }
    }
}