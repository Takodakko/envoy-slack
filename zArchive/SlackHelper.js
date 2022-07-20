
const { WebClient } = require('@slack/web-api');

/**Create clients to attach to req objects in Express Receiver. One has user token for those scopes, one has bot token for those scopes. */
const webClientUser = new WebClient('xoxp-979940347345-3327274984807-3744240563538-69118b62f1b75c9923df23c3171214ad');
const webClientBot = new WebClient(process.env.SLACK_BOT_TOKEN);

module.exports = { webClientUser, webClientBot };