const express = require('express')
const session = require('express-session')
const { App, ExpressReceiver, LogLevel } = require('@slack/bolt');
require('dotenv').config();
const { registerListeners } = require('./apps/envoy/listeners');
const { registerCustomRoutes } = require('./apps/envoy/routes');
const persistedClient = require('./apps/envoy/store/bolt-web-client');
const attachEnvoyInfoOuter = require('./attachEnvoyInfo');
// const { createServer } = require('http');
const { webClientUser, webClientBot } = require('./SlackHelper');


const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');

//const { authWithEnvoy } = require('./apps/envoy/middleware/envoy-auth');
// const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');
// const request = require('request');  //Change to Axios
// const axios = require('axios');
// const Envoy = require('./Envoy');
// const getAccessToken = require('./getAccessToken');
// //const envoy-auth = require('./apps/Envoy/middleware/envoy-auth')
const RedisStore = require('connect-redis')(session);
let { redisClient } = require('./apps/Envoy/util/redisClient')



// const redisClient = createClient({ 
//   legacyMode: true,
//   host: 'localhost',
//   port: 6379
//  })
// redisClient.connect().then(() => {
//   console.log("Successfully connected to Dick")
// }).catch((err) => {
//   console.log("Failed to connect to Redis\n" + err)
// })

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

// app.use(middleware(), errorMiddleware());

// Use custom ExpressReceiver to be able to use express-session middleware
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  app
});



// Initializes your app with your bot token and signing secret
const slackApp = new App(
  {
    // signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
    // clientId: process.env.SLACK_CLIENT_ID,
    // clientSecret: process.env.SLACK_CLIENT_SECRET,
    logLevel: LogLevel.DEBUG,
    receiver
  }
);


// Attach Envoy object to req
//receiver.router.use(middleware());

// Attach Slack WebClient instance to req for use in handling Envoy events that don't go through Slack listeners
receiver.router.use((req, res, next) => {
  req.webClientUser = webClientUser;
  req.webClientBot = webClientBot;
  next();
})
// receiver.router.use(express.json());
// // receiver.router.post('/slack/events', boltHandler);

// Defining ExpressReceiver custom routes
receiver.router.use(express.json());
//attach middleware here
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
// persistedClient.client = slackApp.client;
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

// (() => {
//   try {
//       // Start your app
//       app.listen(process.env.PORT || 3000);
//       console.log(
//           `⚡️ App is running on port ${process.env.PORT || 3000}!`
//       );
//   } catch (error) {
//       console.error('Unable to start App', error);
//       process.exit(1);
//   }
// })();