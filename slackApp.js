const express = require('express')
const session = require('express-session')
const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');
require('dotenv').config();
const { registerListeners } = require('./apps/envoy/listeners');
const { registerCustomRoutes } = require('./apps/envoy/routes');
const persistedClient = require('./apps/envoy/store/bolt-web-client');
const path = require('path');


// const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');
const { makeWebClients } = require('./zArchive/SlackHelper');
const { authWithEnvoy } = require('./apps/Envoy/middleware/envoy-auth')
const RedisStore = require('connect-redis')(session);
let { redisClient } = require('./apps/Envoy/util/RedisClient');
const { middleware, errorMiddleware } = require('@envoy/envoy-integrations-sdk');
const attachEnvoyInfoOuter = require('./apps/Envoy/middleware/attachEnvoyInfo');

// Create custom express app to be able to use express-session middleware
const app = express();
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
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
    // token: process.env.SLACK_BOT_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    authorize: async ({ teamId, enterpriseId }) => {
      // Fetch team info from database
      console.log(teamId, 'teamId');
      function hGetPromise() {
        return new Promise((resolve, reject) => {
          redisClient.hGetAll(teamId, (err, res) => {
            let tokenIdx = res.indexOf('botToken') + 1;
            let botUserIdx = res.indexOf('bot_user_id') + 1;
            if (err) reject(err);
            else {
              const bot = {
                botToken: res[tokenIdx],
                // botId: team.botId,
                botUserId: res[botUserIdx],
              };
              resolve(bot);
            }
          });
        });
      }
      try {
        return await hGetPromise();
      } catch (err) {
        throw new Error('No matching authorizations');
      }
    },
    logLevel: LogLevel.DEBUG,
    receiver,
  }
);
 
receiver.router.use(middleware(), errorMiddleware())
// @DELETE
// Attach Slack WebClient instance to req for use in handling Envoy events that don't go through Slack listeners
const webClientMaker = makeWebClients();
// receiver.router.use((req, res, next) => {
//   req.webClientUser = webClientUser;
//   req.webClientBot = webClientBot;
//   next();
// })
receiver.router.use(webClientMaker);
// Manual implementation of app.use(express.static) to load image files, like the one on the app home page.
receiver.router.get('/static/*', (req, res) => {
  const fp = path.join(__dirname, req.path);
  res.contentType('image/jpeg');
  res.sendFile(fp);
})
// receiver.router.use(express.json());
// // receiver.router.post('/slack/events', boltHandler);

// Defining ExpressReceiver custom routes
receiver.router.use(express.json());
registerCustomRoutes().forEach((route) => {
  const method = route.method[0].toLowerCase();
  receiver.router[method](route.path, route.handler);
});


// Use global middleware to fetch Envoy Authentication details
slackApp.use(authWithEnvoy);
const locationAndFlow = attachEnvoyInfoOuter();
slackApp.use(locationAndFlow);
// Register Listeners
registerListeners(slackApp);

// Assign Slack WebClient
persistedClient.client = slackApp.client;


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
