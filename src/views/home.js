import { getLatest } from "../api/data.js";
import { homeTemplate } from '../templates/homeTemplate.js';

export async function showHomePage(ctx) {
    const games = await getLatest();
    ctx.render(homeTemplate(games));
}