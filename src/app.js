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

const root = document.querySelector('main');

document.querySelector('#logoutBtn').addEventListener('click', async(ev) => {
    ev.preventDefault();
    await logout();
    updateUserNav();
    page.redirect('/home');
});

page(decorateContext);
page('/home', showHomePage);
page('/', '/home');
page('/login', showLoginPage);
page('/register', showRegisterPage);
page('/create', showCreatePage);
page('/catalog', showCatalogPage);
page('/edit/:id', showEditPage);
page('/details/:id', showDetailsPage);



updateUserNav();
page.start();

async function decorateContext(ctx, next) {
    ctx.render = (template) => render(template, root);
    ctx.updateUserNav = updateUserNav;
    next();
}

function updateUserNav() {
    //add a class to the HTML nav buttons like guest/user so that we can hide them
    const userData = getUserData();

    if (userData != null) {
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}