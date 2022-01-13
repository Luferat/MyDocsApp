// Define a página de reload
setPage('contacts');

// Título da página
setTitle('Faça contato');

/**
 * Cria a função de processamento do formulário somente se não existe na memória.
 */
if (typeof sendForm !== 'function') {
    console.log('Criando função "sendForm"...');
    window.sendForm = function () {
        console.log('Enviando contato...');

        // Retorna sem fazer mais nada.
        return false;
    }
} else
    console.log('Função "sendForm" já existe na memória. Não vou criar...');

/**
 * Processa digitação nos campos.
 */

if (typeof inputfilters !== 'function') {
    window.inputfilters = function () {
        console.log('tecla levantada');
    }
}

/**
 * Processa o envio do formulário.
 */
el('#contact').onsubmit = sendForm;

/**
 * Processa cada campo do formulário ao ser preenchido.
 * Chama 'inputfilters' quando uma tecla é solta.
 */
var inputs = el('#contact').elements;
for (let i = 0; i < inputs.length; i++)
    inputs[i].onkeyup = inputfilters;