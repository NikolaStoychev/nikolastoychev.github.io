const msg = document.createElement('span');

const closeBtn = document.createElement('span');
closeBtn.innerHTML = ' &#10006;';

const element = document.createElement('div');
element.id = 'notification';
element.appendChild(msg);
element.appendChild(closeBtn);
element.addEventListener('click', clear);

export function notify(message) {
    msg.textContent = message;
    document.body.appendChild(element);

    setTimeout(5000);
}

export function clear() {
    element.remove();
}