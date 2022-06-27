const { App } = require('@slack/bolt');
const { ErrorHandler } = require('@slack/bolt');
const { LogLevel } = require("@slack/logger");
require('dotenv').config();
const eventAppHomeOpened = require('./eventAppHomeOpened');
const commandCreateInvite = require('./commandCreateInvite');
const viewInviteSubmitted = require('./viewInviteSubmitted');
const shortcutCreateInvite = require('./shortcutCreateInvite');
const actionCreateInvite = require('./actionCreateInvite');
const commandGetLocation = require('./commandGetLocation');
const messageSayHi = require('./messageSayHi');
const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');
const request = require('request');  //Change to Axios
const axios = require('axios');
const Envoy = require('./Envoy');
const getAccessToken = require('./getAccessToken');

const slackApp = new App(
  {
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    logLevel: LogLevel.DEBUG,
  }
);

if (!process.env.SLACK_CLIENT_SECRET || !process.env.SLACK_CLIENT_ID) {
  //contactAdminMessage();
  console.log('contact your admin');
}
// getAccessToken();
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
*/
const envoy = Envoy.getInstance;
// envoy.API.locations().then(res => {
//   console.log(res[0].attributes.name, res[0].attributes.address, '<- This is the place!');
// })

slackApp.use(envoy);
// Test message to interact with app via messages.
slackApp.message('hi', messageSayHi);
/* Slash command to open invite modal.  .command listens for slash commands entered into the message bar. */
slackApp.command('/envoy-invite', commandCreateInvite);
// Slash command to get the name of the user's location.
slackApp.command('/location', commandGetLocation);
/* Event to run when app is opened to home tab.  .event listens for events from the Slack event API. */
slackApp.event('app_home_opened', eventAppHomeOpened);
/* Event to run when invite modal is submitted.  .view listens for modal view requests. */
slackApp.view('invite_modal', viewInviteSubmitted);
/* Event to run when invite button on home is clicked.  .action listens for UI interactions like button clicks. */
slackApp.action('button_invite', actionCreateInvite);
/* Shortcut option to open invite modal.  .shortcut listens for global/message shortcuts (found in the + menu near the message bar). */
slackApp.shortcut('envoy_invite', shortcutCreateInvite);

/* Global ErrorHandler */ 
slackApp.error((err) => {
  console.error(err);
});

(async () => {
  await slackApp.start(process.env.PORT);
  console.log(`Bolting on ${process.env.PORT}`);
})();


module.exports = slackApp;

//https://app.envoy.com/a/auth/v0/authorize?response_type=code&client_id=34396186-e7a7-11ec-bb27-233d2fd743dd&redirect_uri=https://miguel-envoy.ngrok.io/envoy/auth&scope=locations.read+token.refresh
//https://app.envoy.com/a/auth/v0/authorize?response_type=code&client_id=34396186-e7a7-11ec-bb27-233d2fd743dd&redirect_uri=https://app.slack.com/client/TUTTNA7A5/D03KDHXFJPK/app&scope=locations.read+token.refresh
//module.exports = slackApp;
