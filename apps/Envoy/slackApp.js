const express = require('express');
const session = require('express-session');
const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');
const { registerListeners } = require('./listeners');
const { registerCustomRoutes } = require('./routes');


//const { App } = require('@slack/bolt');
const { ErrorHandler } = require('@slack/bolt');
const { LogLevel } = require("@slack/logger");
require('dotenv').config();
const eventAppHomeOpened = require('./eventAppHomeOpened');
const commandCreateInvite = require('./commandCreateInvite');
const viewInviteSubmitted = require('./viewInviteSubmitted');
const shortcutCreateInvite = require('./shortcutCreateInvite');
const actionCreateInvite = require('./apps/Envoy/actionCreateInvite');
const commandGetLocation = require('./commandGetLocation');
const messageSayHi = require('./messageSayHi');
const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');
const request = require('request');  //Change to Axios
const axios = require('axios');
const Envoy = require('./Envoy');

let logLevel;
switch (process.env.LOG_LEVEL) {
    case 'debug':
        logLevel = LogLevel.DEBUG;
        break;
    case 'info':
        logLevel = LogLevel.INFO;
        break;
    case 'warn':
        logLevel = LogLevel.WARN;
        break;
    case 'error':
        logLevel = LogLevel.ERROR;
        break;
    default:
        logLevel = LogLevel.INFO;
}

// Create custom express app to be able to use express-session middleware
const app = express();
app.use(
    session({
        secret: config.hmacKey,
        resave: true,
        saveUninitialized: true
    })
);

// Use custom ExpressReceiver to be able to use express-session middleware
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  app
});

// Initializes your app with your bot token and signing secret
const slackApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  logLevel,
  receiver
});

// const slackApp = new App(
//   {
//     signingSecret: process.env.SLACK_SIGNING_SECRET,
//     token: process.env.SLACK_BOT_TOKEN,
//     clientId: process.env.SLACK_CLIENT_ID,
//     clientSecret: process.env.SLACK_CLIENT_SECRET,
//     logLevel: LogLevel.DEBUG,
//   }
// );

// Defining ExpressReceiver custom routes
receiver.router.use(express.json());
registerCustomRoutes().forEach((route) => {
    const method = route.method[0].toLowerCase();
    receiver.router[method](route.path, route.handler);
});

// Register Listeners
registerListeners(slackApp);

// Assign Slack WebClient
persistedClient.client = boltApp.client;

/**
 * @TODO
 * Repurpose to use Envoy SDK as middleware as intended
 */
// Use global middleware to fetch Salesforce Authentication details
//slackApp.use(authWithSalesforce);

// if (!process.env.SLACK_CLIENT_SECRET || !process.env.SLACK_CLIENT_ID) {
//   //contactAdminMessage();
//   console.log('contact your admin');
// }

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
//const envoy = Envoy.getInstance;
// envoy.API.locations().then(res => {
//   console.log(res[0].attributes.name, res[0].attributes.address, '<- This is the place!');
// })
//slackApp.use(envoy);

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
//slackApp.shortcut('envoy_invite', shortcutCreateInvite);

/* Global ErrorHandler */ 
slackApp.error((err) => {
  console.error(err);
});

(async () => {
  await slackApp.start(process.env.PORT);
  console.log(`Bolting on ${process.env.PORT}`);
})();

// Asynchronous function to start the app
(async () => {
  try {
      // Start your app
      await boltApp.start(process.env.PORT || 3000);
      console.log(
          `⚡️ Bolt app is running on port ${process.env.PORT || 3000}!`
      );
  } catch (error) {
      console.error('Unable to start App', error);
      process.exit(1);
  }
})();