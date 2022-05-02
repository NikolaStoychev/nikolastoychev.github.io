import { html, until } from '../lib.js';

export const editTemplate = (dataPromise) => html `
<section id="edit-page" class="auth">
    ${until(dataPromise, html`<p>Loading &hellip;</p>`)}
</section>`;

export const formTemplate = (data, onSubmit) => html `
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

        <label for="anime-img">Image:</label>
        <input type="text" id="imageUrl" name="imageUrl" value=${data.imageUrl}>

        <label for="summary">Summary:</label>
        <textarea name="summary" id="summary" .value=${data.summary}></textarea>
        <input class="btn submit" type="submit" value="Edit Anime">
    </div>
</form>`;

//for text area  .value=${data.summary} instead of value=${data.summary}