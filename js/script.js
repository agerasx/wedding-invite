document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    const guestName = getQueryParam('guest');

    if (guestName) {
        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            greetingElement.textContent = `Добро пожаловать, ${guestName}!`;
        }

        const tallyIframe = document.getElementById('tally-iframe');
        if (tallyIframe) {
            let tallyUrl = tallyIframe.getAttribute('data-tally-src');
            tallyUrl += tallyUrl.includes("?") ? `&name=${encodeURIComponent(guestName)}` : `?name=${encodeURIComponent(guestName)}`;

            console.log("Updated Tally URL:", tallyUrl); // Проверяем, правильный ли URL

            tallyIframe.setAttribute('src', tallyUrl);
        }

    }



const blocks = document.querySelectorAll('.block');
    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add('visible');
        }, 300 * index);
    });
});
