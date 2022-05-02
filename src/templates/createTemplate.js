import { html } from '../lib.js';

export const createTemplate = (onSubmit) => html `<!-- Create Page ( Only for logged-in users ) -->
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Anime</h1>
            <label for="leg-title">Anime title:</label>
            <input type="text" id="title" name="title" placeholder="Enter anime title...">

            <label for="type">Type:</label>
            <input type="text" id="type" name="type" placeholder="Enter anime type...">

            <label for="yearFrom">Aired From:</label>
            <input type="text" id="yearFrom" name="yearFrom" placeholder="yyyy-mm-dd">

            <label for="yearTo">Aired To:</label>
            <input type="text" id="yearTo" name="yearTo" placeholder="yyyy-mm-dd">

            <label for="episodes">Number of Episodes:</label>
            <input type="number" min ="1" id="episodes" name="episodes">

            <label for="rating">Rating:</label>
            <input type="number" min ="0" step="any" id="rating" name="rating">

            <label for="anime-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="/images/<image name>">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Anime">
        </div>
    </form>
</section>`;