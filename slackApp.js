const express = require('express')
const session = require('express-session')
const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');
const { authWithEnvoy } = require('./apps/envoy/middleware/envoy-auth');
require('dotenv').config();
const { registerListeners } = require('./apps/envoy/listeners');
const { registerCustomRoutes } = require('./apps/envoy/routes');
const persistedClient = require('./apps/envoy/store/bolt-web-client');
const attachEnvoyInfoOuter = require('./attachEnvoyInfo');
const { createServer } = require('http');


const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');


// Create custom express app to be able to use express-session middleware
const app = express();
app.use(
  session({
      secret: process.env.ENVOY_CLIENT_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
  })
);

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
receiver.router.use(middleware());


registerCustomRoutes().forEach((route) => {
    const method = route.method[0].toLowerCase();
    receiver.router[method](route.path, route.handler);
});

// Use global middleware to fetch Envoy Authentication details
// slackApp.use(authWithEnvoy);

// Register Listeners
registerListeners(slackApp);
// console.log(slackApp.listeners);
// Assign Slack WebClient
persistedClient.client = slackApp.client;
// const envoy = Envoy.getInstance();
const envoyInfoMiddleware = attachEnvoyInfoOuter();
slackApp.use(envoyInfoMiddleware);



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
