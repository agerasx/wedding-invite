document.addEventListener("DOMContentLoaded", function () {
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    const guestName = getQueryParam('guest');
    const countInt = getQueryParam('count');

    if (guestName || countInt) {
        const tallyIframe = document.getElementById('tally-iframe');
        if (tallyIframe) {
            let tallyUrl = tallyIframe.getAttribute('data-tally-src');
            const params = [];

            if (guestName) {
                params.push(`guest=${encodeURIComponent(guestName)}`);
            }

            if (countInt) {
                params.push(`count=${encodeURIComponent(countInt)}`);
            }

            if (params.length > 0) {
                tallyUrl += tallyUrl.includes("?") ? `&${params.join("&")}` : `?${params.join("&")}`;
                tallyIframe.setAttribute('src', tallyUrl);
            }
        }

        if (guestName) {
            const greetingElement = document.getElementById('greeting');
            if (greetingElement) {
                greetingElement.textContent = `Добро пожаловать, ${guestName}!`;
            }
        }
    }

    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add('visible');
        }, 300 * index);
    });
});
