import { getPage } from "../api/data.js";
import { catalogTemplate } from "../templates/catalogTemplate.js";

export async function showCatalogPage(ctx) {

    console.log(ctx.querystring)
    const page = Number(ctx.querystring.split('=')[1] || 1);

    const animes = await getPage(page);
    ctx.render(catalogTemplate(animes.data, page, animes.pages));
}