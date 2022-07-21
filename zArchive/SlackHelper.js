
const { WebClient } = require('@slack/web-api');

/**Create clients to attach to req objects in Express Receiver. One has user token for those scopes, one has bot token for those scopes. */
const webClientUser = new WebClient(process.env.SLACK_USER_TOKEN);
const webClientBot = new WebClient(process.env.SLACK_BOT_TOKEN);

module.exports = { webClientUser, webClientBot };