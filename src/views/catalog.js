import { getAll } from "../api/data.js";
import { catalogTemplate } from "../templates/catalogTemplate.js";

export async function showCatalogPage(ctx) {
    const animes = await getAll();
    ctx.render(catalogTemplate(animes));
}