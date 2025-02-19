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

    let fixedHeight = window.innerHeight;

    if (window.visualViewport) {
        fixedHeight = window.visualViewport.height;
    }

    const blocks = document.querySelectorAll('.block');

    document.querySelectorAll('.block').forEach(block => {
        block.style.height = `${fixedHeight}px`;
    });

    function checkVisibility() {
        blocks.forEach((block) => {
            const rect = block.getBoundingClientRect();

            if (rect.top < initialHeight * 0.8 && rect.bottom > 0) {
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

    document.querySelectorAll(".faq-question").forEach(function (question) {
        question.addEventListener("click", function () {
            const faqItem = this.parentElement;
            faqItem.classList.toggle("open");

            const answer = faqItem.querySelector(".faq-answer");

            if (faqItem.classList.contains("open")) {
                answer.style.display = "block";  // Показываем ответ
            } else {
                setTimeout(() => {
                    answer.style.display = "none";  // Скрываем ответ с задержкой после анимации
                }, 500);  // Задержка должна быть чуть больше времени анимации
            }
        });
    });

    window.onload = function() {
        for (let i = 0; i < 10; i++) {
            let petalClone = document.querySelector('.petal').cloneNode(true);

            // Случайные значения для ширины и высоты лепестка
            const width = Math.random() * 20 + 10; // Ширина от 20px до 50px
            const height = Math.random() * 20 + 20; // Высота от 40px до 80px

            petalClone.style.width = `${width}px`;
            petalClone.style.height = `${height}px`;

            // Случайное начальное положение по X
            petalClone.style.left = `${Math.random() * 100}vw`;

            // Случайная продолжительность падения
            petalClone.style.animationDuration = `${Math.random() * 3 + 4}s`;

            document.querySelector('.falling-petals').appendChild(petalClone);
        }
    };

});
