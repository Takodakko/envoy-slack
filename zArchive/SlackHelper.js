
const { WebClient } = require('@slack/web-api');

/**Create clients to attach to req objects in Express Receiver. One has user token for those scopes, one has bot token for those scopes. */
function makeWebClients(user, bot){
    let webClientUser = null;
    let webClientBot = null;
    let userToken = user;
    let botToken = bot;
    return function inner(req, res, next) {
        if (webClientUser === null) {
            webClientUser = new WebClient(userToken ? userToken : process.env.SLACK_USER_TOKEN);
        }
        if (webClientBot === null) {
            webClientBot = new WebClient(botToken ? botToken : process.env.SLACK_BOT_TOKEN);
        }
        req.webClientUser = webClientUser;
        req.webClientBot = webClientBot;
        next();
    }
    
};


module.exports = { makeWebClients };