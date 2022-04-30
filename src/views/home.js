import { html } from "../lib.js";
import { getLatest } from "../api/data.js"

const homeTemplate = (dataPromise) => html `<!-- Home Page -->
<section id="welcome-world">

    <div class="welcome-message">
        <h2>ALL new Animes</h2>
    </div>

    <div id="home-page">
    <h1>Latest Animes</h1>
        ${ dataPromise.length == 0
        ? html `<p class="no-articles">No animes yet</p>`
        : html `${dataPromise.map(gamesCard)}`}
   </div>
</section>`;

const gamesCard = (data) => html `<!-- Display div: with information about every game (if any) -->
<div class="game">
    <div class="image-wrap">
        <img src=${data.imageUrl}>
    </div>
    <h3>${data.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href=${`/details/${data.objectId}`} class="btn details-btn">Details</a>
    </div>
</div>`;

// note that <a href=${`/details/${data._id}`} class="btn btn-info">Details</a> 
//instead of <a href=${`/details/:${data._id}`} class="btn btn-info">Details</a>

export async function showHomePage(ctx) {
    const games = await getLatest();
    ctx.render(homeTemplate(games));
}