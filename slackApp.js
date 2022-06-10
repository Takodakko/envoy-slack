const { App } = require('@slack/bolt');
const { ErrorHandler } = require('@slack/bolt');
require('dotenv').config();
const eventAppHomeOpened = require('./eventAppHomeOpened');
const commandCreateInvite = require('./commandCreateInvite');
const viewInviteSubmitted = require('./viewInviteSubmitted');
const shortcutCreateInvite = require('./shortcutCreateInvite');
const actionCreateInvite = require('./actionCreateInvite');
const messageSayHi = require('./messageSayHi');
const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');
const request = require('request');  //Change to Axios
const axios = require('axios');
const Envoy = require('./Envoy');

const slackApp = new App(
  {
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
  }
);

if (!process.env.SLACK_CLIENT_SECRET || !process.env.SLACK_CLIENT_ID) {
  //contactAdminMessage();
  console.log('contact your admin');
}

/*
* EXAMPLE USE
*
envoyAPI.locations()
  .then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
*/

/**
 * SINGLETON IMPLEMENT
 *
const envoy = Envoy.getInstance();
envoy.API.locations().then(res => {
  console.log(res);
})
*/

slackApp.use(envoyApi);
// Test message to interact with app via messages.
slackApp.message('hi', messageSayHi);
// Slash command to open invite modal.
slackApp.command('/envoy-invite', commandCreateInvite);

// Slash command to get the name of the user's location.
// slackApp.command('/location', commandGetLocation);
slackApp.command('/location', async ({ack, say}) => {
  ack();
  // console.log(envoyApi, 'the envoyAPI');
  const body = await envoyApi.location('143497');
  console.log(body, 'body');
  await say(`You are at ${body.attributes.name} in ${body.attributes.address}`);
});
// Event to run when app is opened to home tab.
slackApp.event('app_home_opened', eventAppHomeOpened);
// Event to run when invite modal is submitted.
slackApp.view('invite_modal', viewInviteSubmitted);
// Event to run when invite button on home is clicked.
slackApp.action('button_invite', actionCreateInvite);
// Shortcut option to open invite modal.
slackApp.shortcut('envoy_invite', shortcutCreateInvite);

// slackApp.error(ErrorHandler);
slackApp.error((err) => {
  console.error(err);
});

(async () => {
  await slackApp.start(process.env.PORT);
  console.log(`running on ${process.env.PORT}`);
})();


module.exports = slackApp;