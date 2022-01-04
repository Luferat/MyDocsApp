
# Usando o json-server no App
Este é um aplicativo de front-end completo que depende de um back-end para funcionar completamente.

Como o desenvolvimento do back-end acontecerá no futuro e com base nas arquiteturas desenvolvidas no front-end, usaremos uma abordagem com API REST, onde a troca de dados entre front-end e back-end ocorrerá usando recursos do protocolo HTTP, onde as partes usarão formatos JSON.

Em "tempo de desenvolvimento", para simular, de forma simplificada, a operação de uma API JSON, usaremos o aplicativo json-server, disponível em https://github.com/typicode/json-server.

## Obtendo o json-server
Seguindo as instruções do site oficial:

- Inicie um "Node.js command prompt" diferente do que será usado com o aplicativo; 
  - *Sim, teremos dois "Node.js command prompt" abertos simultaneamente.*
- Instale o aplicativo de forma global, comandando:
`npm install -g json-server`

## Criando a base de dados
Precisamos iniciar um banco de dados 'fake' para operar com o aplicativo:

- Abra o aplicativo no VSCode;
- Crie, na raiz do mesmo (pasta onde está a 'index.html'), um diretório chamado 'db';
- Dentro de './db', crie um novo arquivo 'db.html';
- Abra '.db/db.html' no editor e crie o seguinte conteúdo:
``{ "contacts": [] }``
- Salve e feche o arquivo.

## Rodando a API JSON
Precisamos "rodar" o json-server e ele deve estar ativo durante todo o tempo de desenvolvimento e testes locais do aplicativo:

- Retorne ao "Node.js command prompt" em que instalou o 'json-server';
- Acesse o diretório do banco de dados, criado anteriormente dentro do diretório do aplicativo;
  - Por exemplo, comandando ``cd .\db`` se já estiver dentro do diretório do aplicativo ou ``cd \Users\[seu_username]\Projetos\MyDocsApp\db`` se estiver em qualquer outro local;
    - Faça ajustes nos caminhos acima e garanta que ao digitar ``dir``, consegue ver o arquivo ``db.json``.
 - Inicie o serviço comandando:
 ``json-server --watch db.json``
 - Observe e anote o endereço em que a API está rodando, provavelmente, será algo como ``http://localhost:3000``.

## Conflito de portas
Pode acontecer de, tanto o servidor do aplicativo (lite-server) quanto o da API REST (json-server) estarem usando a mesma porta HTTP, normalmente '3000'. Se isso ocorrer, ambos os servidores serão desativados.

Para evitar que isso ocorra, você pode trocar a porta de operação da API, usando, por exemplo, a porta '3030', comandando:
``json-server --watch db.json --port 3030``

Mais uma vez, é importante anotar o endereço em que a API está operando, por exemplo, ``http://localhost:3030``, já que ele será usado em nosso aplicativo.