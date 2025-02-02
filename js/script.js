document.addEventListener("DOMContentLoaded", function() {
    const blocks = document.querySelectorAll('.block');

    blocks.forEach((block, index) => {
        setTimeout(() => {
            block.classList.add('visible');
        }, 300 * index); // задержка 300 мс между блоками
    });
});
