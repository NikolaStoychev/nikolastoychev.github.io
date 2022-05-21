import { page, render } from './lib.js';
import { logout } from '../src/api/data.js';
import { getUserData } from './util.js';
import { showHomePage } from './views/home.js';
import { showCatalogPage } from './views/catalog.js';
import { showLoginPage } from './views/login.js';
import { showRegisterPage } from './views/register.js';
import { showEditPage } from './views/edit.js';
import { showDetailsPage } from './views/details.js';
import { showCreatePage } from './views/create.js';
import { showSearchPage } from './views/search.js';

const root = document.querySelector('main');

document.querySelector('#logoutBtn').addEventListener('click', async(ev) => {
    ev.preventDefault();
    await logout();
    updateUserNav();
    page.redirect('/home');
});

document.querySelector('.search-form').addEventListener('submit', onSearch);


page(decorateContext);
page('/home', showHomePage);
page('/', '/home');
page('/login', showLoginPage);
page('/register', showRegisterPage);
page('/create', showCreatePage);
page('/catalog/:page', showCatalogPage);
page('/edit/:id', showEditPage);
page('/details/:id', showDetailsPage);
page('/search/:query', showSearchPage);



updateUserNav();
page.start();

async function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    const userData = getUserData();

    if (userData != null) {
        document.querySelector('#welcomeMsg').textContent = `Welcome, ${userData.name}`;
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}

function onSearch(ev) {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    const searchParam = formData.get('search').trim();
    page.redirect(`/search/${searchParam}`);
}