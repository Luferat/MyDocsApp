/** global.js
 * 
 * Este é o JavaScript principal do aplicativo. 
 * Todo o controle doaplicativo é realizado por este arquivo.
 * 
 * Por Luferat --> http://github.com/Luferat 
 */

/**
 * Obtém nome da página que está sendo acessada, do 'localStorage'.
 * Estude '404.html' para mais detalhes.
 */
let path = localStorage.getItem('path');

// Se cliente acessou uma página específica
if (path) {

    // Limpa o 'localStorage'
    localStorage.removeItem('path');

    // Acessa a página solicitada
    loadPage(path);

    // Se não solicitou uma página específica
} else {

    // Carrega a página inicial
    loadPage('home');
}

/**
 * Monitora modanças na resolução e executa 'changeRes()' se ocorrer
 *   Referências: https://www.w3schools.com/jsref/event_onresize.asp
 */
window.onresize = changeRes;

/**
 * Monitora cliques nas tags <a>...</a> e executa 'routerLink()' se ocorrer
 *   Referências: https://www.w3schools.com/js/js_loop_for.asp
 */
var links = els('a');
for (var i = 0; i < links.length; i++) {
    links[i].onclick = routerLink;
}

/*******************************
 * Funções Espefícifas do tema *
 *******************************/

/**
 * Ação do clique no botão do menu 
 */
function menuToggle() {

    /** 
     * Se o menu está visível (class="menu-opened"), oculta ele.
     *   Referências: https://www.w3schools.com/jsref/prop_element_classlist.asp
     */
    if (el('#mainMenu').classList.contains('menu-opened')) hideMenu();

    // Se o menu está oculto (class="menu-closed"), mostra ele
    else showMenu();

    // Termina sem fazer mais nada
    return false;
}

/**
 * Mostra menu, troca ícone e altera 'title' do botão.
 *   Referências:
 *     https://www.w3schools.com/jsref/prop_element_classlist.asp
 *     https://www.w3schools.com/jsref/met_element_setattribute.asp  
 */
function showMenu() {
    el('#mainMenu').classList.remove('menu-closed');
    el('#mainMenu').classList.add('menu-opened');
    el('a[href="#menu"]').classList.add('fa-rotate-90');
    el('a[href="#menu"]').setAttribute('title', 'Oculta o menu');
}

/**
 * Oculta menu, troca ícone e altera 'title' do botão.
 */
function hideMenu() {
    el('#mainMenu').classList.remove('menu-opened');
    el('#mainMenu').classList.add('menu-closed');
    el('a[href="#menu"]').classList.remove('fa-rotate-90');
    el('a[href="#menu"]').setAttribute('title', 'Mostra o menu');
}

/**
 * Processa mudanças na resolução
 */
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
 * Processa clique no link
 */
function routerLink(event) {

    // Obtém os atributos 'href' e 'target' do link clicado
    var href = this.getAttribute('href');
    var target = this.getAttribute('target');

    /**
     * Monitora cliques no 'a#btnMenu' e executa toggleMenu() se ocorrer
     *  Referências: https://www.w3schools.com/jsref/dom_obj_event.asp
     */
    if (href === '#menu') {
        menuToggle();
        return false;
    }

    // Oculta o menu principal em resoluções menores
    hideMenu();

    // Se href não existe, não faz nada
    if (href === '' || href === null) {
        // event.preventDefault();
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
        // event.preventDefault();
        loadPage(href);
        return false;
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
 * existir sem conteúdo.
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

    // Carrega o CSS e salva em style#pageCSS na 'index.html'    
    if (getFile(page.css, '#pageCSS')) {

        // Se carregou o CSS, 
        // carrega o HTML e salva em div#content na 'index.html' 
        if (getFile(page.html, '#content')) {

            // Atualiza endereço da página no navegador
            window.history.replaceState('', '', href);

            // carrega o JavaScript e executa
            getFile(page.js);
        }
    }
}

/**
 * Obtém arquivo via requisição HTTP assíncrona.
 *   Referências: https://www.w3schools.com/js/js_api_fetch.asp
 */
async function getFile(filePath, element = '') {

    // Faz a requisição via HTTP do documento em 'filePath'
    // Quando a resposta chegar, armazena-a em 'response'
    const response = await fetch(filePath);

    // Extrai os dados úteis de 'response' e armazena em 'content'
    const content = await response.text();

    // Se não declarou um elemento onde deixar os resultados, executa-os
    // é o caso dos arquivos JavaScript
    if (element === '') eval(content);

    // Se declarou um elemento, envia os dados para o innerHTML do elemento
    else el(element).innerHTML = content;

    // Retorna com true se deu certo
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

/**
 * Processa o título da página dinâmicamente na tag <title>...</title>
 */
function setTitle(pageTitle = '') {

    // Se não definiu o título, usa o formato abaixo
    if (pageTitle == '') el('head>title').innerHTML = `My.Docs.App .:. Seus documentos em nossas mãos.`;

    // Se definiu o título, usa o formato abaixo
    else el('head>title').innerHTML = `My.Docs.App .:. ${pageTitle}`;

    // Sai sem fazer mais nada
    return false;
}