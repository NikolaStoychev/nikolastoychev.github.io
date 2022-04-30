import { html } from '../lib.js';
import { getById, deleteById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (data, onDelete) => html `<!--Details Page-->
<section id="game-details">
    <h1>Anime Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src=${data.imageUrl} />
            <h1>${data.title}</h1>
            <p class="levels">Type: ${data.type}</p>
            <p class="levels">Year: ${new Date(data.yearFrom).toLocaleDateString()} - ${new Date(data.yearTo).toLocaleDateString()}</p>
            <p class="levels">Rating: ${data.rating}</p>
        </div>

        <p class="text">${data.summary}</p>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        ${data.isOwner
            ? html`
                <div class="buttons">
                    <a href=${`/edit/${data.objectId}`} class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`
            : null }
    </div>
</section>`;

export async function showDetailsPage(ctx) {
    const animeId = ctx.params.id;
    const userData = getUserData();
    const anime = await getById(animeId);

    if (userData && userData.id == anime.ownerId) {
        anime.isOwner = true;
    }else if(userData){
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