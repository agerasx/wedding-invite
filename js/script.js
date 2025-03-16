document.addEventListener("DOMContentLoaded", function () {
    const guestList = {
        "gaisin_family": { names: "Мама и Папа", count: 2 },
        "utyamishev_family": { names: "Хайдар и Гульназира", count: 2 },
        "karasbaev_family": { names: "Файзи и Ляля", count: 2 },
        "khalikov_family": { names: "Артур и Зульфия", count: 2 },
        "sibagatullin_family": { names: "Расим и Луиза", count: 2 },
        "kharunov_family": { names: "Азамат и Ильзира", count: 2 },
        "bayazitov_family": { names: "Нияз и Ильсия", count: 2 },
        "mustafin_family": { names: "Айнур и Ильмира", count: 2 },
        "islaev_family": { names: "Марсель, Регина, Диана и Динара", count: 4 },
        "islamgaliyev_family": { names: "Дамир и Гульсина", count: 2 },
        "timergaliyev_family": { names: "Федор и Римма", count: 2 },
        "miftakhov_family": { names: "Руслан и Кристина", count: 2 },
        "romanov_family": { names: "Алексей и Герда", count: 2 },
        "malyshev": { names: "Александр", count: 1 },
        "nigatullin_daniil": { names: "Даниил", count: 2 },
        "yulmukhametov_rayman": { names: "Райман", count: 2 },
        "bayazitova_ziliya": { names: "Зилия", count: 1 },
        "tonkikh_elmira": { names: "Эльмира", count: 1 },
        "gumerov_family": { names: "Руслан, Альбина, Рената, Радмир", count: 4 },
        "garifullin_family": { names: "Наиль и Вероника", count: 2 },
        "zaripov_family": { names: "Вадим, Юлия и Роман", count: 3 },
        "khafizov_family": { names: "Айнур и Арина", count: 2 },
        "yunusov_family": { names: "Азат, Адель, Радмир и Камилла", count: 4 },
        "valiahmetov_family": { names: "Ильшат и Рейхан", count: 2 },
        "khasanov_family": { names: "Ришат и Гузалия", count: 2 },
        "bikbulatov_family": { names: "Ирик и Гульнур", count: 2 },
        "alsu": { names: "Алсу", count: 1 },
        "ayupov_family": { names: "Разида", count: 1 },
        "khalikov_family_2": { names: "Рашит и Эмилия", count: 2 },
        "faizov_family_1": { names: "Фанави и Хусна", count: 2 },
        "faizov_family_2": { names: "Ринат, Лилия, Булат и Тимур", count: 4 },
        "faizov_family_3": { names: "Радмир и Лиана", count: 2 },
        "kurbanov_family": { names: "Фандит, Нурия, Алина и Альбина", count: 4 },
        "sokolov_family": { names: "Владимир и Надежда", count: 2 },
        "chumakov_family": { names: "Николай и Марина", count: 2 },
        "kasimov_family": { names: "Алия и Азат", count: 2 },
        "timashev_family": { names: "Эмиль и Марина", count: 2 },
        "muratova": { names: "Луиза", count: 1 },
        "chascheva": { names: "Лидия", count: 1 },
        "samigullina": { names: "Эльвира", count: 1 }
    };

    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    const guestKey = getQueryParam("guests");

    if (guestKey && guestList.hasOwnProperty(guestKey)) {
        const guestData = guestList[guestKey];
        const guestName = guestData.names;
        const countInt = guestData.count;

        const tallyIframe = document.querySelector("iframe[data-tally-src]");

        if (tallyIframe) {
            let baseUrl = tallyIframe.getAttribute("data-tally-src");

            let url = new URL(baseUrl);
            url.searchParams.set("guest", guestName);
            url.searchParams.set("count", countInt);

            console.log("Final Tally URL:", url.toString());

            tallyIframe.setAttribute("data-tally-src", url.toString());

            if (tallyIframe.hasAttribute("src")) {
                tallyIframe.src = url.toString();
            }
        }

        const greetingElement = document.getElementById('greeting');
        if (greetingElement) {
            if (countInt > 1) {
                greetingElement.innerHTML = `Дорогие ${guestName}, без вас этот день был бы неполным!<br>Добро пожаловать на нашу свадьбу!`;
            } else {
                greetingElement.innerHTML = `${guestName}, мы счастливы разделить этот день с тобой!<br>Добро пожаловать на нашу свадьбу!`;
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
