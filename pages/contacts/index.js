// Define a página de reload
setPage('contacts');

// Título da página
setTitle('Faça contato');

/**
 * Cria a função de processamento do formulário somente se não existe na 
 * memória.
 */
if (typeof sendForm !== 'function') {

    console.log('Criando função "sendForm"...');

    // Função que processa o formulario
    window.sendForm = function () {

        console.log('Enviando contato...');

        // Obtém os campos do formulário e sanitiza.
        var contact = {
            name: sanitizeString(el('#contactName').value),
            email: sanitizeString(el('#contactEmail').value),
            subject: sanitizeString(el('#contactSubject').value),
            message: sanitizeString(el('#contactMessage').value)
        }

        /**
         * Não envia o formulário se algum campo está vazio.
         * Isso é útil caso a validação do HTML/CSS falhe.
         */
        var empty = false;
        for (let key in contact) {
            if (contact[key] === '') {

                // Primeira letra de 'key' maiúscula
                let ucKey = key[0].toUpperCase() + key.substr(1);

                // Reescreve o campo
                el(`#contact${ucKey}`).value = '';

                empty = true;
            }
        }
        if (empty) return false;

        // Adiciona a data de envio e o status do contato
        contact.date = getSystemDate();
        contact.status = 'recebido';

        /**
         * Salva contato no banco de dados.
         * 
         * O que vai acontecer aqui, depende de seu back-end e de como ele vai
         * receber os dados do front-end. Provavelmente uma API REST que recebe
         * os dados em JSON.
         */
        console.log('Salvei isso no banco de dados --> ', contact);

        /**
         * Faz a conexão com a API REST contendo o banco de dados usando o
         * método HTTP 'POST' e postando os dados no 'body' do documento 
         * enviado, formatado como um JSON.
         */
        fetch(`${config.apiURL}contacts`, {
            method: "POST",
            body: JSON.stringify(contact),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })

            // Resposta do 'fetch' --> Contato enviado.
            .then(response => {

                // Se falhou por algum motivo...
                if (!response.ok) {

                    // Formata mensagem de erro na view.
                    el('#feedback').innerHTML = `
                        <h2>Olá!</h2>
                        <p class="red">Algo deu errado e não foi possível enviar seu contato.</p>
                        <p class="red">por favor, tente mais tarde.</p>
                        <p><em>Obrigado!</em></p>
                    `;

                    // Se deu tudo certo...
                } else {

                    // Obtém só o primeiro nome do remetente.
                    var name = contact.name.split(' ')[0];

                    // Mensagem de saída para o usuário (feedback)
                    el('#feedback').innerHTML = `
                        <h3>Olá ${name}!</h3>
                        <p>Seu contato foi enviado com sucesso.</p>
                        <p><em>Obrigado...</em></p>
                    `;
                }
            })

            // Resposta do 'fetch' --> Falha ao enviar contato.
            .catch(error => {
                console.error(`Oooops! Algo deu muito errado: ${error}.`);
            })

        // Limpa campos do formulário para permitir novos envios.
        el('#contactName').value = '';
        el('#contactEmail').value = '';
        el('#contactSubject').value = '';
        el('#contactMessage').value = '';

        // Oculta o formulário.
        el('#contact').style.display = 'none';

        // Mostra feedback
        el('#feedback').style.display = 'block';

        // Retorna sem fazer mais nada. Evita ação do HTML.
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