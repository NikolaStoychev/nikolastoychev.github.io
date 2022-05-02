import { html } from '../lib.js';

export const catalogTemplate = (dataPromise, page, pages) => html ` <!-- Catalogue -->
<section id="catalog-page">
    <h1>All Animes</h1>
    <div class="pagination">
        ${page > 1 ? html`<a class="page-buttons" href=${`?page=${page - 1}`}>&lt; Prev</a>` : null }
        ${page < pages ? html`<a  class="page-buttons" href=${`?page=${page + 1}`}>Next &gt;</a>` : null}
    </div>
        ${ dataPromise.length ==0 
        ? html `<h3 class="no-articles">No articles yet</h3>` 
        : html `${dataPromise.map(dataCard)}`}
</section>`;

export const dataCard = (data) => html `<!-- Display div: with information about every anime (if any) -->
<div class="allAnimes">
    <div class="allAnimes-info">
        <img src=${data.imageUrl}>
        <h6>${data.category}</h6>
        <h2>${data.title}</h2>
        <a href=${`/details/${data.objectId}`} class="details-button">Details</a>
    </div>
</div>`;