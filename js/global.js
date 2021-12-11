// Executa app quando documento estiver pronto
// window.addEventListener('load', () => { }, false);

// Seleciona botão do menu
var menuToggle = el('#menu-toggle');

// Seleciona menu
var menu = el('.wrap>nav');

// Detecta mudanças na resolução
changeRes();
window.addEventListener('resize', changeRes)

// Monitora cliques no botão do menu
menuToggle.addEventListener('click', menuClick);

// Ação do click no botão do menu
function menuClick() {

    // Se o menu está visível
    if (window.getComputedStyle(menu, null).display === 'block') {

        // Ocula menu
        hideMenu();

        // Se o menu está oculto
    } else {

        // Mostra menu
        showMenu();

    }
}

// Oculta o menu, troca ícone e o title do botão
function hideMenu() {
    menu.style.display = 'none';
    menuToggle.innerHTML = '<i class="fas fa-bars fa-fw"></i>';
    menuToggle.setAttribute('title', 'Abre menu');
}

// Mostra o menu, troca ícone e o title do botão
function showMenu() {
    menu.style.display = 'block';
    menuToggle.innerHTML = '<i class="fas fa-times fa-fw"></i>';
    menuToggle.setAttribute('title', 'Fecha menu');
}

// Processa mudanças de resolução
function changeRes(event) {

    // Se a resolução é maior
    if (document.documentElement.clientWidth > 767)

        // Mostra menu
        showMenu();

    // Se a resolução é menor
    else

        // Oculta menu
        hideMenu();
}

// Atalho para seleção de elementos
function el(selector) {
    return document.querySelector(selector);
}
