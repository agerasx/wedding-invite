document.addEventListener("DOMContentLoaded", function() {
    // Функция для чтения параметров URL
    function getQueryParam(param) {
        const params = new URLSearchParams(window.location.search);
        return params.get(param);
    }

    // Получаем значение guest из URL (например, ?guest=Alex)
    const guestName = getQueryParam('guest');

    if (guestName) {
        // Обновляем персональное приветствие
        const greetingElement = document.getElementById('greeting');
        greetingElement.textContent = `Добро пожаловать, ${guestName}! Мы рады, что вы с нами.`;

        // Обновляем ссылку Google Формы для предзаполнения имени
        const gformIframe = document.getElementById('gform');
        // Получаем исходный URL формы из атрибута src
        let gformUrl = gformIframe.getAttribute('src');

        // Параметр для предзаполнения поля «Имя Фамилия»
        // Замените entry.123456789 на реальный ключ из вашей формы.
        const prefillParam = `&entry.1965039113=${encodeURIComponent(guestName)}`;

        // Если в URL уже есть другие параметры, просто дописываем prefillParam
        // (Предполагается, что URL уже содержит embedded=true)
        gformUrl += prefillParam;
        gformIframe.setAttribute('src', gformUrl);
    }

    // Анимация появления блоков
    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add('visible');
        }, 300 * index);
    });
});
