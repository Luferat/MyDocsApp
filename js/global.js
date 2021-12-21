/** global.js
 * 
 * JavaScript principal
 * 
 */

// Botão do menu
var btnMenu = el('#menu-toggle');

// Menu principal
var menu = el('.wrap>nav');

/**
 * Monitora cliques no btnMenu, chamando toggleMenu()
 *  Referências: https://www.w3schools.com/jsref/dom_obj_event.asp
 */
btnMenu.onclick = menuToggle;

// Monitora modanças na resolução e redireciona para 'changeRes()'
window.onresize = changeRes;

// Ação do clique no botão do menu 
function menuToggle() {

    /** 
     * Se o menu está visível (display="block"), oculta ele.
     *   Referências: https://www.w3schools.com/jsref/jsref_getcomputedstyle.asp
     */
    if (window.getComputedStyle(menu, null).display === 'block') hideMenu();

    // Se o menu está oculto (displa="none"), mostra ele
    else showMenu();

    // Termina sem fazer nada
    return false;
}

// Mostra menu, troca ícone e altera 'title' do botão.
function showMenu() {

    /**
     * Referências:
     *   https://www.w3schools.com/jsref/dom_obj_style.asp
     *   https://www.w3schools.com/jsref/prop_element_classlist.asp
     *   https://www.w3schools.com/jsref/met_element_setattribute.asp     * 
     */

    menu.style.display = 'block';
    btnMenu.classList.add('fa-rotate-90');
    btnMenu.setAttribute('title', 'Oculta o menu');
}

// Oculta menu, troca ícone e altera 'title' do botão.
function hideMenu() {
    menu.style.display = 'none';
    btnMenu.classList.remove('fa-rotate-90');
    btnMenu.setAttribute('title', 'Mostra o menu');
}

// Processa mudanças na resolução
function changeRes() {

    /**
     * Se a resolução é maior, sempre mostra o menu.
     *   Referências: https://www.w3schools.com/jsref/prop_document_documentelement.asp
     */
    if (document.documentElement.clientWidth > 767) showMenu();

    // Se a resolução é menor, sempre oculta o menu
    else hideMenu();

    // Sai sem fazer mais nada
    return false;
}

/**
 * Atalho para document.querySelector()
 *   Referências: https://www.w3schools.com/jsref/met_document_queryselector.asp
 */
function el(selector) {
    return document.querySelector(selector);
}

/**
 * Atalho para document.querySelectorAll()
 *   Referências: https://www.w3schools.com/jsref/met_document_queryselectorall.asp
 */
function els(selector) {
    return document.querySelectorAll(selector);
}
