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

// Monitora cliques nas tags <a>...</a>
var links = els('a');
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', routerLink);
}

/**********************
 * Funções JavaScript *
 **********************/

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

function routerLink(event) {

    // Obtém os atributos 'href' e 'target' do link clicado
    var href = this.getAttribute('href');
    var target = this.getAttribute('target');

    // Se href não existe, não faz nada
    if (href === '' || href === null) {
        event.preventDefault();
        return false;
    }

    /** 
     * Se href é um link externo ('http://', 'https://'), uma âncora ('#')
     * ou o target = '_blank', devolve o controle para o HTML.
     */
    if (
        target === '_blank' ||
        href.substr(0, 7) === 'http://' ||
        href.substr(0, 8) === 'https://' ||
        href.substr(0, 1) === '#'
    ) return true;

    // Se é uma rota (link interno), carrega a página solcitada
    else {
        // Bloqueia ação do HTML
        event.preventDefault();
        loadPage(href);
    }

    // Termina sem fazer mais nada
    return false;
}

/**
 * Carrega a página solicitada pela rota
 * Observe que cada página fica em um diretório com o nome dela sob 'pages' 
 * e é composta de 3 arquivos:
 * 
 *   index.css --> Folha de estilos exclusiva desta página  
 *   index.html --> Estrutura HTMl desta página
 *   index.js --> JavaScript exclusivo desta página
 * 
 * OBS: mesmo que não use 'index.css' e/ou 'index.js', estes arquivos devem 
 * existir sem conteúdo
 */
function loadPage(href) {

    // Monta caminho para a página (Escolha um formato)
    var page = {

        // Folha de estilos da página
        css: `pages/${href}/index.css`,

        // HTML da página
        html: 'pages/' + href + '/index.html',

        // JavaScript da página
        js: "pages/" + href + "/index.js"
    };

    // Carrega cada arquivo da página hierarquicamente
    if (getFile(page.css, '#page-css')) {
        if (getFile(page.html, '#content')) {
            getFile(page.js)
        } else {
            console.error(`${page.html} não existe!`);
        }
    } else {
        console.error(`${page.css} não existe!`);
    }
}

async function getFile(filePath, element = '') {
    const fetchResult = fetch(filePath)
    const response = await fetchResult;
    const contentData = await response.text();
    if (element === '') eval(contentData);
    else el(element).innerHTML = contentData;
    return true;
}

/************************
 * Funções de uso geral *
 ************************/

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
