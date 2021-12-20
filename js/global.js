/** global.js
 * 
 * JavaScript principal
 * 
 */

// Botão do menu
var btnMenu = el('#menu-toggle');

// Menu principal
var menu = el('.wrap>nav');

// Monitora cliques no btnMenu, chamando toggleMenu()
btnMenu.onclick = menuToggle;

// Monitora modanças na resolução e redireciona para 'changeRes()'
window.addEventListener('resize', changeRes);

// Ação do clique no botão do menu 
function menuToggle() {

    // Se o menu está visível (display="block"), oculta ele
    if (window.getComputedStyle(menu, null).display === 'block') hideMenu();

    // Se o menu está oculto (displa="none"), mostra ele
    else showMenu();

    // Termina sem fazer nada
    return false;
}

// Mostra menu
function showMenu() {
    menu.style.display = 'block';
    // btnMenu.innerHTML = '<i class="fas fa-ellipsis-h fa-fw"></i>';
    btnMenu.setAttribute('title', 'Oculta o menu');
    btnMenu.classList.add('fa-rotate-90');
}

// Oculta menu
function hideMenu() {
    menu.style.display = 'none';
    // btnMenu.innerHTML = '<i class="fas fa-ellipsis-v fa-fw"></i>';
    btnMenu.setAttribute('title', 'Mostra o menu');
    btnMenu.classList.remove('fa-rotate-90');
}

// Processa mudanças na resolução
function changeRes() {
    
    // Se a resolução é maior, sempre mostra o menu
    if(document.documentElement.clientWidth > 767) showMenu();

    // Se a resolução é menor, sempre oculta o menu
    else hideMenu();

    // Sai sem fazer mais nada
    return false;
}

// Atalho para document.querySelector()
function el(selector) {
    return document.querySelector(selector);
}

// Atalho para document.querySelectorAll()
function els(selector) {
    return document.querySelectorAll(selector);
}
