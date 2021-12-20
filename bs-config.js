/** bs-config.js - Script de configuração do "lite-server"
 * 
 * Esta é a configuração do "lite-server" para operar com aplicativos SPA.
 * Ele deve estar presente na raiz do aplicativo que será executado no servidor.
 * 
 * Para instalar o lite-server e o middleware para SPA globalmente:
 *   npm install -g lite-server
 *   npm install -g connect-history-api-fallback
 * 
 * Para instalar o lite-server e o middleware para SPA localmente no namespace 'dev':
 *   npm install lite-server --save-dev
 *   npm install connect-history-api-fallback --save-dev  
 * 
 * Documentação completa:
 *   https://github.com/johnpapa/lite-server#readme
 * 
 */

module.exports = {
    server: {
        middleware: {
            // overrides the second middleware default with new settings
            1: require('connect-history-api-fallback')({
                index: '/index.html',
                verbose: true,
            }),
        },
    },
};