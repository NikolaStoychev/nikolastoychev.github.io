import { getAll } from "../api/data.js";
import { html } from "../lib.js";

const catalogTemplate = (dataPromise) => html ` <!-- Catalogue -->
<section id="catalog-page">
    <h1>All Animes</h1>
        ${ dataPromise.length ==0 
        ? html `<h3 class="no-articles">No articles yet</h3>` 
        : html `${dataPromise.map(animeCard)}`}
</section>`;

const animeCard = (data) => html `<!-- Display div: with information about every game (if any) -->
<div class="allGames">
    <div class="allGames-info">
        <img src=${data.imageUrl}>
        <h6>${data.category}</h6>
        <h2>${data.title}</h2>
        <a href=${`/details/${data.objectId}`} class="details-button">Details</a>
    </div>
</div>`;

// note that <a href=${`/details/${data._id}`} class="btn btn-info">Details</a> 
//instead of <a href=${`/details/:${data._id}`} class="btn btn-info">Details</a>

export async function showCatalogPage(ctx) {
    const animes = await getAll();
    ctx.render(catalogTemplate(animes));
}