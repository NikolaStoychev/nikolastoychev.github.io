import { html } from '../lib.js';

export const detailsTemplate = (data, onDelete) => html `<!--Details Page-->
<section id="anime-details">
    <h1>Anime Details</h1>
    <div class="info-section">

        <div class="anime-header">
            <img class="anime-img" src=${data.imageUrl} />
            <h1>${data.title}</h1>
            <p class="levels">Type: ${data.type}</p>
            <p class="levels">Number Of Episodes: ${data.episodes}</p>
            <p class="levels">Rating: ${data.rating}</p>
            <p class="levels">Year: ${new Date(data.yearFrom).toLocaleDateString()} - ${new Date(data.yearTo).toLocaleDateString()}</p>
        </div>

        <p class="text">${data.summary}</p>

        <!-- Edit/Delete buttons ( Only for creator of this anime )  -->
        ${data.isOwner
            ? html`
                <div class="buttons">
                    <a href=${`/edit/${data.objectId}`} class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>`
            : null }
    </div>
</section>`;