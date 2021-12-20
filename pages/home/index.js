setTitle();
console.log('JavaScript de home está Ok!');

// Se função já exite ela não será criada
if (typeof loadHome === 'function') {

    // Executa função
    loadHome('ja foi');

    // Se função não existe, cria primeiro
} else {
    console.log('Criando');

    // Cria função
    window.loadHome = function (text) {
        console.log(text);
    }

    // Executa função
    loadHome('agora foi');
}