const { App } = require('@slack/bolt');
const { ErrorHandler } = require('@slack/bolt');
require('dotenv').config();
const eventAppHomeOpened = require('./eventAppHomeOpened');
const commandCreateInvite = require('./commandCreateInvite');
const sayHi = require('./sayHi');


const slackApp = new App(
  {
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
  }
);



slackApp.message('hi', sayHi);

slackApp.command('/envoy-invite', commandCreateInvite);

slackApp.event('app_home_opened', eventAppHomeOpened);

slackApp.shortcut('envoy_invite', commandCreateInvite);

slackApp.error(ErrorHandler);

(async () => {
  await slackApp.start(process.env.PORT);
  console.log(`running on ${process.env.PORT}`);
})();


module.exports = slackApp;