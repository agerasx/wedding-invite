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
                const names = guestName.split(" и ");
                if (names.length > 1) {
                    greetingElement.innerHTML = `Дорогие ${guestName}, без вас этот день был бы неполным!<br>Добро пожаловать на нашу свадьбу!`;
                } else {
                    greetingElement.innerHTML = `${guestName}, мы счастливы разделить этот день с тобой!<br>Добро пожаловать на нашу свадьбу!`;
                }
            }
        }

    }

    const blocks = document.querySelectorAll('.block');

    function checkVisibility() {
        blocks.forEach((block) => {
            const rect = block.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight * 0.8 && rect.bottom > 0) {
                if (!block.classList.contains('visible')) {
                    block.classList.add('visible');

                    const texts = block.querySelectorAll('.text-animate');
                    texts.forEach((text, i) => {
                        setTimeout(() => {
                            text.classList.add('visible');
                        }, 250 * i);
                    });
                }
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();

    function loadBackgroundImages() {
        const sections = document.querySelectorAll(".image-bg");

        sections.forEach((section) => {
            const bgImage = section.dataset.bg;
            if (bgImage) {
                section.style.backgroundImage = `url('${bgImage}')`;
            }
        });
    }

    loadBackgroundImages();
});
