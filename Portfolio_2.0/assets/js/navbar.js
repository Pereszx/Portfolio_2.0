window.addEventListener('scroll', function () {
    const bloco = document.getElementById('navbar');
    const scrollTrigger = 10; // altura em px a partir do topo

    if (window.scrollY > scrollTrigger) {
        bloco.classList.add('ativo');
    } else {
        bloco.classList.remove('ativo');
    }
});

window.addEventListener('scroll', function () {
    const bloco = document.getElementById('to-top');
    const scrollTrigger = 10; // altura em px a partir do topo

    if (window.scrollY > scrollTrigger) {
        bloco.classList.add('ativo');
    } else {
        bloco.classList.remove('ativo');
    }
});

