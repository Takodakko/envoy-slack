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
const getAccessToken = require('./Envoy');
// const envoyApi = require('./Envoy');


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
// const TOKEN_SCOPE = [
//   'token.refresh', 
//   'locations.read', 
//   'companies.read',
//   'flows.read',
//   'invites.read',
//   'invites.write',
//   'employees.read',
//   'reservations.read',
//   'reservations.write',
//   'work-schedules.read',
//   'work-schedules.write',
// ].join();
// let accessToken = '';
// let envoyApi = {};
// async function getAccessToken({context, next}) {
//   //const url = 'https://api.envoy.com/oauth2/token';
//   const options = {
//       'method': 'POST',
//       'url': 'https://api.envoy.com/oauth2/token',
//       'headers': {
//           'Authorization': 'Basic ' + process.env.ENVOY_CLIENT_API_KEY,
//           json: true
//       },
//       // auth: {
//       //   'username': process.env.API_USERNAME,
//       //   'password': process.env.API_USER_PASSWORD,
//       //   'scope': TOKEN_SCOPE,
//       //   'grant_type': 'password',
//       // },
//       formData: {
//           'username': process.env.API_USERNAME,
//           'password': process.env.API_USER_PASSWORD,
//           'scope': TOKEN_SCOPE,
//           'grant_type': 'password',
//       },
//     //   data: {
//     //     'username': process.env.API_USERNAME,
//     //     'password': process.env.API_USER_PASSWORD,
//     //     'scope': TOKEN_SCOPE,
//     //     'grant_type': 'password',
//     // }
//   };
  
//   request(options, function (error, response) {
//       if (error) throw new Error(error);
//       accessToken = JSON.parse(response.body).access_token;
//       // console.log(accessToken);
//       envoyApi = new EnvoyAPI(accessToken);
//       context.envoyAPI = envoyApi;      
//   });
//      await next();
//     //  try {
//       //  axios(options)
//       //  .then((response) => {
//       //    console.log(response.data, 'response.data');
//       //    accessToken = response.data.access_token;
//       //  })
//       // .catch(err => {
//       //   console.log(err.response.status, err.message, err.response.data);
//       // })
//     // }
//     //  catch(err) {
//     //    console.log(err?.response?.status, err?.response?.data?.message);
//     //  }

// }
// getAccessToken();

/* Global Middleware to attach an envoyAPI object to context. */
slackApp.use(getAccessToken);
/* Test message to interact with app via messages.  .message listens for specific text entered into the message bar. */
slackApp.message('hi', messageSayHi);
/* Slash command to open invite modal.  .command listens for slash commands entered into the message bar. */
slackApp.command('/envoy-invite', commandCreateInvite);

// Slash command to get the name of the user's location.
slackApp.command('/location', commandGetLocation);
// slackApp.command('/location', async ({ack, say, context}) => {
//   ack();
//   console.log(context, 'context in /location');
//   const body = await envoyAPI.location('143497');
//   console.log(body, 'body');
//   await say(`You are at ${body.attributes.name} in ${body.attributes.address}`);
// });
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
  console.log(`Thunder god Thor is hammering on ${process.env.PORT}`);
})();


module.exports = slackApp;