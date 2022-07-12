const express = require('express')
const session = require('express-session')
const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');
const { middleware, errorMiddleware } = require('@envoy/envoy-integrations-sdk');
require('dotenv').config();
const { registerListeners } = require('./apps/envoy/listeners');
const { registerCustomRoutes } = require('./apps/envoy/routes');
const persistedClient = require('./apps/envoy/store/bolt-web-client');

const commandCreateInvite = require('./commandCreateInvite');
const viewInviteSubmitted = require('./viewInviteSubmitted');
const shortcutCreateInvite = require('./shortcutCreateInvite');
const actionCreateInvite = require('./actionCreateInvite');
const actionLocationSelect = require('./actionLocationSelect');
const commandGetLocation = require('./commandGetLocation');
const messageSayHi = require('./messageSayHi');

//const { authWithEnvoy } = require('./apps/envoy/middleware/envoy-auth');
// const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');
// const request = require('request');  //Change to Axios
// const axios = require('axios');
// const Envoy = require('./Envoy');
// const getAccessToken = require('./getAccessToken');
// //const envoy-auth = require('./apps/Envoy/middleware/envoy-auth')

//const RedisStore = require('connect-redis')(session);
//const { createClient } = require('redis')
//const redisClient = require('./apps/Envoy/util/redisClient')

/*
const redisClient = createClient({ 
  legacyMode: true,
  host: 'localhost',
  port: 6379
 })
redisClient.connect().then(() => {
  console.log("Successfully connected to Redis")
}).catch((err) => {
  console.log("Failed to connect to Redis\n" + err)
})
*/

// Create custom express app to be able to use express-session middleware
const app = express();
app.use(
    session({
        //store: new RedisStore({ client: redisClient }),
        secret: process.env.ENVOY_CLIENT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
    })
);

app.use(middleware(), errorMiddleware());

// Use custom ExpressReceiver to be able to use express-session middleware
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  app
});

// Initializes your app with your bot token and signing secret
const slackApp = new App(
  {
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    logLevel: LogLevel.DEBUG,
    receiver
  }
);

// Defining ExpressReceiver custom routes
receiver.router.use(express.json());
//attach middleware here
registerCustomRoutes().forEach((route) => {
    const method = route.method[0].toLowerCase();
    receiver.router[method](route.path, route.handler);
});

// Use global middleware to fetch Salesforce Authentication details
//slackApp.use(authWithEnvoy);

// Register Listeners
registerListeners(slackApp);

// Assign Slack WebClient
persistedClient.client = slackApp.client;

// Test message to interact with app via messages.
slackApp.message('hi', messageSayHi);
/* Slash command to open invite modal.  .command listens for slash commands entered into the message bar. */
slackApp.command('/envoy-invite', commandCreateInvite);
// Slash command to get the name of the user's location.
slackApp.command('/location', commandGetLocation);
/* Event to run when app is opened to home tab.  .event listens for events from the Slack event API. */
//slackApp.event('app_home_opened', eventAppHomeOpened);
/* Event to run when invite modal is submitted.  .view listens for modal view requests. */
slackApp.view('invite_modal', viewInviteSubmitted);
/* Event to run when invite button on home is clicked.  .action listens for UI interactions like button clicks. */
slackApp.action('button_invite', actionCreateInvite);
/* Shortcut option to open invite modal.  .shortcut listens for global/message shortcuts (found in the + menu near the message bar). */
slackApp.shortcut('envoy_invite', shortcutCreateInvite);

/* actions to respond to dropdown clicks on the location and visitor type buttons on the invitation modal */
slackApp.action('location_selected', actionLocationSelect);
slackApp.action('visitor_type', async ({ack, body}) => {
  await ack();
  console.log(body.view.state.values.location_guest_type.visitor_type.selected_option.value, 'flow id when visitor button clicked');
});

// Asynchronous function to start the app
(async () => {
  try {
      // Start your app
      await slackApp.start(process.env.PORT || 3000);
      console.log(
          `⚡️ Bolt app is running on port ${process.env.PORT || 3000}!`
      );
  } catch (error) {
      console.error('Unable to start App', error);
      process.exit(1);
  }
})();
