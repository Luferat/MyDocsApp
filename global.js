/** ./global.js
 * 
 * Este é o JavaScript principal do aplicativo. 
 * Todo o controle do aplicativo é realizado por este arquivo.
 * 
 * By Luferat → http://github.com/Luferat 
 * MIT Lisence → https://opensource.org/licenses/MIT
 */

/*********************************
 * Declarando variáveis globais. *
 *********************************/

/**
 * Variável que armazenará as configurações do aplicativo em tempo de execução.
 * Os valores de 'config' são obtidos da coleção 'config' da API JSON.
 */
var config = {};

/**
 * Variável com o endereço (URL) da API JSON.
 *   Observe que esta URL sempre deve terminar com '/'.
 */
var apiRUL = 'http://localhost:3030/';

/**
 * Criando 'promessa' que lê as configurações da API JSON.
 *   Referências:
 *     https://www.w3schools.com/js/js_promise.asp
 */
let getConfig = new Promise((resolve, reject) => {

    /**
     * Lendo coleção config da API JSON usando HTTP:GET.
     */
    fetch(apiRUL + 'config')

        // Se conseguiu...
        .then((resolveData) => {

            // Filtra os dados obtidos como JSON/Objeto
            resolveData.json().then((data) => {

                // Conclui a 'promessa' devolvendo os dados obtidos.
                resolve(data);
            });
        })

        // Se falhou...
        .catch((err) => {

            // Rejeita a 'promessa', devolvendo a mensagem de erro obtida.
            reject(err);
        })

});

/**
 * Executando a 'promessa' criada em 'getConfig'.
 */
getConfig.then((data) => {

    /**
     * Se cumpriu a 'promessa', armazena as configurações obtidas em 'config'.
     * e executa o aplicativo principal 'mainApp()'.
     */
    config = data;
    mainApp();

}).catch((error) => {

    /**
     * Se não cumpriu a 'promessa', obtém e exibe mensagem de erro no console.
     */
    console.error('Algo deu errado! Muito errado mesmo! ' + error);
})

/**
 * Aplicativo principal.
 * 
 * Esta função contém todo o processamento principal do aplicativo.
 * 
 * Ela, basicamente, trata eventos disparados pelo navegador, pelo sistema, 
 * pelo usuário, etc.
 */
function mainApp() {

    /**
     * Obtém nome da página que está sendo acessada, do 'localStorage'.
     * Estude './404.html' para mais detalhes.
     */
    let path = localStorage.getItem('path');

    // Se cliente acessou uma página específica...
    if (path) {

        // Limpa o 'localStorage'.
        localStorage.removeItem('path');

        // Acessa a página solicitada.
        loadPage(path);

        // Se não solicitou uma página específica...
    } else {

        // Carrega a página inicial.
        loadPage('home');
    }

    /**
     * Força o fechamento do menu na incialização do aplicativo com 'hideMenu()' e
     * monitora as dimensões da view. Executa 'changeRes()' se ocorrerem mudanças.
     *   Referências: 
     *     https://www.w3schools.com/jsref/event_onresize.asp
     */
    hideMenu();
    window.onresize = changeRes;

    /**
     * Monitora cliques nas tags <a>...</a> e executa 'routerLink()' se ocorrer.
     *   Referências: 
     *     https://www.w3schools.com/js/js_loop_for.asp
     */
    let links = els('a');
    for (let i = 0; i < links.length; i++) {
        links[i].onclick = routerLink;
    }

}

/*******************************
 * Funções Espefícifas do tema *
 *******************************/

/**
 * Ação do clique no botão do menu. 
 *   Referências:
 *     https://www.w3schools.com/jsref/prop_element_classlist.asp
 */
function menuToggle() {

    // Se o menu está visível (class="menu-opened"), oculta ele.
    if (el('#mainMenu').classList.contains('menu-opened')) hideMenu();

    // Se o menu está oculto (class="menu-closed"), mostra ele.
    else showMenu();

    // Termina sem fazer mais nada.
    return false;
}

/**
 * Mostra menu, troca ícone e altera 'title' do botão.
 * Basicamente desfaz o que foi feito na função 'hideMenu()'.
 *   Referências:
 *     https://www.w3schools.com/jsref/prop_element_classlist.asp
 *     https://www.w3schools.com/jsref/met_element_setattribute.asp
 * 
 * OBS: esta funcionalidade poderia ser implementada na função 'menuToggle()',
 *      mas, dessa forma, podemos abrir o menu de forma independente, bastando
 *      executar 'showMenu()' a qualquer momento.  
 */
function showMenu() {
    el('#mainMenu').classList.remove('menu-closed');
    el('#mainMenu').classList.add('menu-opened');
    el('a[href="#menu"]').classList.add('fa-rotate-90');
    el('a[href="#menu"]').setAttribute('title', 'Oculta o menu');
}

/**
 * Oculta menu, troca ícone e altera 'title' do botão.
 * Basicamente desfaz o que foi feito na função 'showMenu()'.
 * 
 *   Referências:
 *     https://www.w3schools.com/jsref/prop_element_classlist.asp
 *     https://www.w3schools.com/jsref/met_element_setattribute.asp
 * 
 * OBS: esta funcionalidade poderia ser implementada na função 'menuToggle()',
 *      mas, dessa forma, podemos fechar o menu de forma independente, bastando
 *      executar 'hideMenu()' a qualquer momento.  
 */
function hideMenu() {
    el('#mainMenu').classList.remove('menu-opened');
    el('#mainMenu').classList.add('menu-closed');
    el('a[href="#menu"]').classList.remove('fa-rotate-90');
    el('a[href="#menu"]').setAttribute('title', 'Mostra o menu');
}

/**
 * Processa mudanças na view conforme as dimensões (clientWidth) desta.
 *   Referências:
 *     https://www.w3schools.com/jsref/prop_document_documentelement.asp
 */
function changeRes() {

    // Se a resolução é maior que 767 pixels, sempre mostra o menu.
    if (document.documentElement.clientWidth > config.clientWidth - 1) showMenu();

    // Se a resolução é menor, sempre oculta o menu.
    else hideMenu();

    // Sai sem fazer mais nada.
    return false;
}

/**
 * Processa clique no link.
 *   Referências:
 *     https://www.w3schools.com/js/js_this.asp
 *     https://www.w3schools.com/jsref/dom_obj_event.asp
 *     https://www.w3schools.com/jsref/met_element_getattribute.asp
 *     https://www.w3schools.com/jsref/jsref_substr.asp
 */
function routerLink(event) {

    // Obtém os atributos 'href' e 'target' do link clicado.
    var href = this.getAttribute('href');
    var target = this.getAttribute('target');

    // Monitora cliques no 'a#btnMenu' e executa toggleMenu() se ocorrer.
    if (href === '#menu') {
        menuToggle();
        return false;
    }

    // Oculta o menu principal, mas somente em resoluções menores.
    hideMenu();

    // Se 'href' não existe ou esta vazio, não faz nada
    if (href === '' || href === null) return false;

    /** 
     * Se href é um link externo ('http://...', 'https://...'), 
     * uma âncora ('#') ou target='_blank', devolve o controle 
     * para o HTML com 'return true'.
     */
    if (
        target === '_blank' ||
        href.substr(0, 7) === 'http://' ||
        href.substr(0, 8) === 'https://' ||
        href.substr(0, 1) === '#'
    ) return true;

    /**
     * Se é uma rota (link interno), carrega a página solicitada com 
     * 'loadPage()' e bloqueia ação padrão do HTML com 'return false'.
     */
    else {
        loadPage(href);
        return false;
    }
}

/**
 * Carrega a página solicitada pela rota.
 * Observe que cada página fica em um diretório com o nome dela sob 'pages' 
 * e é composta de 3 arquivos:
 * 
 *   index.css  → Folha de estilos exclusiva desta página.
 *   index.html → Estrutura HTMl desta página.
 *   index.js   → JavaScript exclusivo desta página.
 * 
 * OBS: mesmo que não use 'index.css' e/ou 'index.js', estes arquivos devem 
 * existir, mesmo sem conteúdo (vazios).
 * 
 *   Referências:
 *     https://www.w3schools.com/js/js_history.asp
 */
function loadPage(href) {

    /**
     * Monta caminhos para os componentes da página solicitada.
     * Por exemplo, ao acessar a página 'about' temos:
     *                       ┌─────────────┘
     *   page.css  → pages/about/index.css
     *   page.html → pages/about/index.html
     *   page.js   → pages/about/index.js
     */
    var page = {

        // Folha de estilos da página.
        css: `pages/${href}/index.css`,

        // HTML da página.
        html: `pages/${href}/index.html`,

        // JavaScript da página.
        js: `pages/${href}/index.js`
    };

    // Carrega o CSS e salva em style#pageCSS na 'index.html'.
    if (getFile(page.css, '#pageCSS')) {

        // Carrega o HTML e salva em div#content na 'index.html'.
        if (getFile(page.html, '#content')) {

            // Atualiza endereço da página no navegador.
            window.history.replaceState('', '', href);

            // Carrega o JavaScript na memória e o executa.
            getFile(page.js);

            // Mensagens em caso de erros...
        } else console.error('Erro ao carregar componente "HTML" da página.');
    } else console.error('Erro ao carregar componente "CSS" da página.');
}

/**
 * Obtém arquivo especificado em 'filePath' via requisição HTTP assíncrona.
 * Se 'element' é declarado, exibe o conteúdo obtido no elemento selecionado.
 *   Referências:
 *     https://www.w3schools.com/js/js_asynchronous.asp
 *     https://www.w3schools.com/js/js_async.asp
 *     https://www.w3schools.com/js/js_api_fetch.asp
 *     https://www.w3schools.com/jsref/jsref_eval.asp
 *     https://www.w3schools.com/jsref/prop_html_innerhtml.asp
 */
async function getFile(filePath, element = '') {

    /**
     * Faz a requisição via HTTP do documento em 'filePath'.
     * Quando a resposta chegar, armazena-a em 'response'.
     */
    const response = await fetch(filePath);

    // Extrai os dados úteis de 'response' e armazena em 'content'.
    const content = await response.text();

    /**
     * Se não declarou um elemento onde deixar os resultados, executa-os,
     * pois se trata de um arquivo JavaScript.
     */
    if (element === '') eval(content);

    // Se declarou um elemento, envia os dados para o innerHTML do elemento.
    else el(element).innerHTML = content;

    // Retorna com true se deu certo
    return true;
}

/************************
 * Funções de uso geral *
 ************************/

/**
 * Atalho para document.querySelector().
 *   Referências: 
 *     https://www.w3schools.com/jsref/met_document_queryselector.asp
 */
function el(selector) {
    return document.querySelector(selector);
}

/**
 * Atalho para document.querySelectorAll().
 *   Referências:
 *     https://www.w3schools.com/jsref/met_document_queryselectorall.asp
 */
function els(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Processa o título da página dinâmicamente na tag <title>...</title>.
 */
function setTitle(pageTitle = '') {

    // Se não definiu 'pageTitle', usa o formato especificado...
    if (pageTitle == '')
        el('head>title').innerHTML = `${config.appName} ${config.separator} ${config.appSlogan}`;

    // Se definiu 'pageTitle', usa o formato especificado...
    else
        el('head>title').innerHTML = `${config.appName} ${config.separator} ${pageTitle}`;

    // Sai sem fazer mais nada.
    return false;
}

/** 
 * setPage() → Experimental
 * Para que o SPA funcione corretamente, configura a rota correta ao recarregar
 * a página no navegador em servidores HTTP sem suporte para '404.html'.
 * 
 * Esta função deve ser executada na chamada de cada rota. 
 * Por exemplo, ao chamar 'about', executamos 'setPage('about')' em 
 * 'pages/about/index.js'.   │                            │
 *          └────────────────┴────────────────────────────┘
 */
function setPage(pageName) {
    localStorage.setItem('path', pageName);
}

/**
 * Sanitiza 'stringValue', removendo caracteres perigosos e espaços 
 * desnecessários. 
 * Por padrão (stripTags = true), remove tags HTML e scripts.
 *   Referências:
 *     https://www.w3schools.com/jsref/jsref_replace.asp
 *     https://www.w3schools.com/jsref/jsref_obj_regexp.asp
 *     https://www.w3schools.com/jsref/jsref_trim_string.asp
 */
function sanitizeString(stringValue, stripTags = true) {

    // Remove todas as tags HTML
    if (stripTags) stringValue = stringValue.replace(/<[^>]*>?/gm, "");

    // Quebras de linha viram <br>
    stringValue = stringValue.replace(/\n/g, "<br />").trim();

    // Remove espaços antes e depois
    return stringValue.trim();
}

/**
 * Gera a data atual em formato system date "YYYY-MM-DD HH:II:SS".
 * Este é o formato recomendado para salvar no banco de dados.
 *   Referências:
 *     https://www.w3schools.com/js/js_dates.asp
 *     https://www.w3schools.com/jsref/jsref_gettimezoneoffset.asp
 *     https://www.w3schools.com/jsref/jsref_gettime.asp
 *     https://www.w3schools.com/jsref/jsref_toisostring.asp
 *     https://www.w3schools.com/jsref/jsref_split.asp
 */
function getSystemDate() {

    // Obtém a data atual do navegador.
    var yourDate = new Date();

    // Obtém o fusohorário d navegador.
    var offset = yourDate.getTimezoneOffset();

    // Ajusta o fusohorário se necessário.
    yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);

    // Separa data da hora.
    returnDate = yourDate.toISOString().split("T");

    // Separa partes da data.
    returnTime = returnDate[1].split(".");

    // Formata data como 'system date'.
    return `${returnDate[0]} ${returnTime[0]}`;
}

/**
 * Formata uma 'system date' (YYYY-MM-DD HH:II:SS) 
 * para 'Br date' (DD/MM/YYYY às HH:II:SS).
 *                            └─────────────────────────────────────┐
 *   dateString → String com data formatada em 'system date';       │
 *   separator → String que separa data da hora. Por default será ' às '.
 */
function getBrDate(dateString, separator = ' às ') {

    // Separa data e hora.
    var p1 = dateString.split(" ");

    // Separa partes da data.
    var p2 = p1[0].split("-");

    // Remonta partes da data e hora.
    return `${p2[2]}/${p2[1]}/${p2[0]}${separator}${p1[1]}`;
}
