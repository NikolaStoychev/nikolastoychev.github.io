import { html, until } from "../lib.js";
import { editById, getById } from '../api/data.js';
import { getFormData } from '../util.js';

const editTemplate = (dataPromise) => html `
<section id="edit-page" class="auth">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
</section>`;

const formTemplate = (data, onSubmit) => html `
<form @submit=${onSubmit} id="edit">
    <div class="container">
        <h1>Edit Anime</h1>
        <label for="leg-title">Anime title:</label>
        <input type="text" id="title" name="title" value=${data.title}>

        <label for="type">Type:</label>
        <input type="text" id="type" name="type" value=${data.type}>

        <label for="yearFrom">Aired From:</label>
        <input type="text" id="yearFrom" name="yearFrom" value=${data.yearFrom}>

        <label for="yearTo">Aired To:</label>
        <input type="text" id="yearTo" name="yearTo" value=${data.yearTo}>

        <label for="episodes">Number of Episodes:</label>
        <input type="number" min ="1" id="episodes" name="episodes" value=${data.episodes}>

        <label for="rating">Rating:</label>
        <input type="number" min ="0" step="any" id="rating" name="rating" value=${data.rating}>

        <label for="game-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value=${data.imageUrl}>

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value=${data.summary}></textarea>
        <input class="btn submit" type="submit" value="Edit Anime">
    </div>
</form>`;

//for text area  .value=${data.summary} instead of value=${data.summary}

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
            alert(error.message);
        }
    }
}

async function loadGame(id, onSubmit) {
    const anime = await getById(id);
    return formTemplate(anime, onSubmit);
}