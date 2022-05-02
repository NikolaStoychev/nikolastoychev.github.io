import { getById, deleteById } from '../api/data.js';
import { getUserData } from '../util.js';
import { detailsTemplate } from '../templates/detailsTemplate.js';


export async function showDetailsPage(ctx) {
    const animeId = ctx.params.id;
    const userData = getUserData();
    const anime = await getById(animeId);

    if (userData && userData.id == anime.ownerId) {
        anime.isOwner = true;
    } else if (userData) {
        anime.isOwner = false;
    }

    ctx.render(detailsTemplate(anime, onDelete));

    async function onDelete(ev) {
        ev.preventDefault();
        const confirmed = confirm('Are you sure you want to delete this listing?'); // returns true or false depending on the choice of the user
        if (confirmed) {
            await deleteById(animeId);
            ctx.page.redirect('/home');
        }
    }
}