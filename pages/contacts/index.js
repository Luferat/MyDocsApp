/** ./pages/contacts/index.js
 * 
 * Este JavaScript é de uso exclusivo da página/rota 'contasts'.
 * ele faz validação e processa o envio do formulário no front-end.
 * 
 * By Luferat → http://github.com/Luferat 
 * MIT Lisence → https://opensource.org/licenses/MIT
 */

// Define a página de reload
setPage('contacts');

// Título da página
setTitle('Faça contato');

/**
 * Cria função de processamento do formulário somente se não existe na memória.
 *   Referências:
 *     https://www.w3schools.com/js/js_typeof.asp
 *     https://www.w3schools.com/jsref/prop_text_value.asp
 *     https://www.w3schools.com/js/js_json_stringify.asp
 */
if (typeof sendForm !== "function") {

    console.log('Criando função "sendForm"...');

    window.sendForm = function () {

        console.log('Enviando contato...');

        /**
         * Obtém e sanitiza os campos preenchidos.
         * A função 'sanitizeString()' é declarada em 'global.js'.
         * Campos adicionais podem ser processados aqui. Por exemplo:
         *   contact.date → Data de envio do contato;
         *   contact.status → Campo de controle sobre status do contato.
         */
        var contact = {
            name: sanitizeString(el('#contact-name').value),
            email: sanitizeString(el('#contact-email').value),
            subject: sanitizeString(el('#contact-subject').value),
            message: sanitizeString(el('#contact-message').value),
            date: getSystemDate(),
            status: 'recebido'
        }

        /**
         * Não envia o form se algum campo esta vazio.
         * Isso é útil caso a validação do HTML/CSS falhe.
         */
        var empty = false;
        for (let key in contact) {
            if (contact[key] == '') {
                el(`#contact-${key}`).value = '';
                empty = true;
            };
        }
        if (empty) return false;

        /**
         * Salva contato no banco de dados.
         * 
         * O que vai acontecer aqui depende de seu back-end e de como ele vai 
         * receber os dados do front-end. Provalmente uma API REST que recebe
         * os dados em JSON...
         * 
         * No exemplo, está salvando em um banco de dados JSON (./db/db.json)
         * provido pelo 'json-server'.
         *   Referências:
         *     https://github.com/typicode/json-server
         */

        // console.log(contact); // Dados brutos.
        // console.log(JSON.stringify(contact)); // Dados em JSON.

        /**
         * Faz a conexão com a API REST contendo o banco de dados usando o 
         * método HTTP 'POST' e postando os dados no 'body' do documento enviado, 
         * formatando-o como um JSON.
         */
        fetch('http://localhost:3030/contacts', {
            method: "POST",
            body: JSON.stringify(contact),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

            // Resposta do 'fetch'
            .then(response => {

                // Se falhou por algum motivo...
                if (!response.ok) {

                    // Formata mensagem de saída na view.
                    el('#feedback').innerHTML = `
                        <h2>Olá!</h2>
                        <p class="red">Algo deu errado e não foi possível enviar seu contato.</p>
                        <p class="red">Por favor, tente mais tarde.</p>
                        <p><em>Obrigado...</em></p>
                    `;

                    console.error('Falha ao enviar contato!');

                    // Se deu tudo certo...
                } else {

                    // Obtém o primeiro nome do remetente.
                    var name = contact.name.split(' ')[0];

                    // Formata mensagem de saída na view.
                    el('#feedback').innerHTML = `
                        <h2>Olá ${name}!</h2>
                        <p>Seu contato foi enviado com sucesso.</p>
                        <p><em>Obrigado...</em></p>
                    `;

                    console.log('Contato enviado com sucesso!');
                }

            })

        // Limpa os campos do formulário para permitir novos envios.
        el('#contact-name').value = '';
        el('#contact-email').value = '';
        el('#contact-subject').value = '';
        el('#contact-message').value = '';

        // Oculta formulário.
        el('#contact').style.display = 'none';

        // Exibe mensagem de saída.
        el('#feedback').style.display = 'block';

        /**
         * Termina sem fazer mais nada.
         * Isso evita que o controle retorne para o HTML e que o formulário
         * seja enviado por lá também.
         */
        return false;
    }
} else
    console.log('Função "sendForm" já existe na memória. Não vou criar...');

/**
 * A função 'inputFilters' evita que o usuário digite somente espaços no campo 
 * do formulário. Também remove qualquer espaço duplicado digitado no campo.
 * 
 * Se o campo (HTML) tiver o atributo 'data-spaces="true"', a remoção dos 
 * espaços duplicados é desligada para ele.
 * 
 * Dica 1: esta função pode ser ampliada com outros filtros que atuarão durante a 
 * digitação (onkeyup) nos campos.
 * 
 * Dica 2: caso esta função seja usada em outras páginas/formulários, mova-a 
 * para ./global.js.
 * 
 *   Referências:
 *     https://www.w3schools.com/jsref/jsref_replace.asp
 *     https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart
 */
if (typeof inputFilters !== "function") {

    console.log('Criando função "inputFilters"...');

    window.inputFilters = function () {

        // Remove quaisquer espaços no começo do campo.
        this.value = this.value.trimStart();

        // Se 'data-spaces="true"' no campo, não faz mais nada
        if (this.getAttribute('data-spaces') !== 'true')

            /** 
             * Para qualquer outro valor ou ausência de 'data-spaces', remove espaços duplicados do campo. 
             */
            this.value = this.value.replace(/\s{2,}/g, ' ');
    }

} else
    console.log('Função "inputFilters" já existe na memória. Não vou criar...');

/**
 * Processa envio do formulário.
 *   Referências:
 *     https://www.w3schools.com/jsref/event_onsubmit.asp
 */
el('#contact').onsubmit = sendForm;

/**
 * Processa cada campo do formulário ao ser preenchido.
 */
var inputs = el('#contact').elements;
for (var i = 0; i < inputs.length; i++) {
    inputs[i].onkeyup = inputFilters;
}
