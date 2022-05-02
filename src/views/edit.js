import { editById, getById } from '../api/data.js';
import { getFormData } from '../util.js';
import { editTemplate, formTemplate } from '../templates/editTemplate.js';
import { notify } from '../common/notification.js';

export function showEditPage(ctx) {
    const animeId = ctx.params.id;
    ctx.render(editTemplate(loadGame(animeId, onSubmit)));

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

            const anime = await editById(animeId, data);

            ctx.page.redirect(`/details/${anime.objectId}`);
        } catch (error) {
            notify(error.message);
        }
    }
}

async function loadGame(id, onSubmit) {
    const anime = await getById(id);
    return formTemplate(anime, onSubmit);
}