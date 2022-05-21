import { getSearchByTitle } from "../api/data.js";
import { searchTemplate } from "../templates/searchTemplate.js";

export async function showSearchPage(ctx) {
    const searchQuery = ctx.params.query;
    const animes = await getSearchByTitle(searchQuery);
    ctx.render(searchTemplate(animes));
}