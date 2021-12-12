// Executa app quando documento estiver pronto
// window.addEventListener('load', () => { }, false);

// Inicializa global que armazena configuraçõs do app
var config = {};

// Seleciona menu principal
var menu = el('.wrap>nav');

// Seleciona botão do menu (toggle) de controle do menu
var menuToggle = el('#menu-toggle');

// Carrega configurações iniciais do App em 'config'
fetch('../database/config.json')
    .then(response => { return response.json(); })
    .then(data => {

        // Transfere configurações para a global 'config'
        config = data;

        // Debug - Exibe todas as configurações do app no console
        // console.log(config);

        // Carrega a página inicial do app
        loadPage('home');

        // Monitora cliques no botão do menu
        menuToggle.addEventListener('click', menuClick);

        // Detecta mudanças na resolução
        changeRes();
        window.addEventListener('resize', changeRes)

        // Monitora cliques nas tags <a>
        var link = document.querySelectorAll('a');
        for (var i = 0; i < link.length; i++) {
            link[i].addEventListener('click', routerLink);
        }

        // Sai sem fazer mais nada
        return false;

    });

// Ação do click no botão do menu
function menuClick() {

    // Se o menu está visível, oculta ele
    if (window.getComputedStyle(menu, null).display === 'block') hideMenu();

    // Se o menu está oculto, mostra ele
    else showMenu();

    // Sai sem fazer mais nada
    return false;
}

// Oculta o menu, troca ícone e o 'title' do botão
function hideMenu() {
    menu.style.display = 'none';
    menuToggle.innerHTML = '<i class="fas fa-bars fa-fw"></i>';
    menuToggle.setAttribute('title', 'Abre menu');

    // Sai sem fazer mais nada
    return false;
}

// Mostra o menu, troca ícone e o 'title' do botão
function showMenu() {
    menu.style.display = 'block';
    menuToggle.innerHTML = '<i class="fas fa-times fa-fw"></i>';
    menuToggle.setAttribute('title', 'Fecha menu');

    // Sai sem fazer mais nada
    return false;
}

// Processa mudanças de resolução
function changeRes(event) {

    // Se a resolução é maior, sempre mostra o menu
    if (document.documentElement.clientWidth > 767) showMenu();

    // Se a resolução é menor, sempre oculta o menu
    else hideMenu();

    // Sai sem fazer mais nada
    return false;
}

// Atalho para seleção de elementos
function el(selector) {
    return document.querySelector(selector);
}

// Assume o controle sobre cliques nos links <a>
function routerLink(e) {

    // Obtém atributos 'href' e 'target' do link clicado
    var href = this.getAttribute('href');
    var target = this.getAttribute('target');

    // Se href não existe, não faz nada
    if (href == '' || href == null) e.preventDefault();

    // Se href é um link externo ('http://' ou 'https://') ou uma âncora ('#'), devolve controle para o HTML
    if (
        target == '_blank' ||
        href.substr(0, 7) == 'http://' ||
        href.substr(0, 8) == 'https://' ||
        href.substr(0, 1) == '#'
    ) return true;

    // Se é um link (rota) interno, carrega a página solicitada
    else {
        e.preventDefault();
        loadPage(href);
    }

    // Sai sem fazer mais nada
    return false;
}

/** Carrega página solicitada e, opcionalmente, define seu título <title>...</title>
 * Observe que cada página fica em um diretório com o nome dela, sob './pates' e é composta de 3 arquivos:
 * 
 *  • index.css --> Folha de estilos exclusiva desta página
 *  • index.html --> Estrutura HTML da página
 *  • index.js --> JavaScript exclusivo desta página
 * 
 * Mesmo que não use 'index.css' e/ou 'index.js', estes arquivos devem existir sem conteúdo.
 */
function loadPage(page, title = '') {

    // Ajusta tag <title>
    setTitle(title);

    // Caminho dos objetos da página
    const pagePath = `../pages/${page}/index`;

    // Carrega cada objeto (arquivo) da página hierarquicamente
    if (getFile(`${pagePath}.css`, '#page-css'))
        if (getFile(`${pagePath}.html`, '#content'))
            getFile(`${pagePath}.js`);

    // Sai sem fazer mais nada
    return false;
}

/** Obtém cada componente da página usando 'fetch'
 * Observe que 'getFile()' é um método assíncrono.
 */
async function getFile(filepath, element = '') {
    const fetchResult = fetch(filepath)
    const response = await fetchResult;
    const contentData = await response.text();

    // Se não informou um local na view para carregar o conteúdo, executa-o (JavaScript)
    if (element == '') eval(contentData);

    // Carrega o conteúdo do arquivo na view
    else el(element).innerHTML = contentData;

    // Sai com positivo
    return true;
}

// Processa o título da página. Tag <title>...</title>
function setTitle(pageTitle = '') {

    // Se não definiu o título, usa o formato abaixo
    if (pageTitle == '') el('head>title').innerHTML = `${config.app.name} ${config.app.sep} ${config.app.slogan}`;

    // Se definiu o título, usa o formato abaixo
    else el('head>title').innerHTML = `${config.app.name} ${config.app.sep} ${pageTitle}`;

    // Sai sem fazer mais nada
    return false;
}