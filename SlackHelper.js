// const { Request, Response } = require("express");
const { App, LogLevel } = require('@slack/bolt');
const attachEnvoyInfoOuter = require('./attachEnvoyInfo');
const { registerListeners } = require('./apps/envoy/listeners');
const persistedClient = require('./apps/envoy/store/bolt-web-client');

const slackApp = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  logLevel: LogLevel.DEBUG,
});

registerListeners(slackApp);

const envoyInfoMiddleware = attachEnvoyInfoOuter();
slackApp.use(envoyInfoMiddleware);

// persistedClient.client = slackApp.client;



async function boltHandler(req, res, next) {
  let ackCalled = false;
  console.log(req, 'req');
  const event = {
    body: req.body,
    ack: (res) => {
      if (ackCalled) {
        return;
      }

      // if (res.statusCode[0] !== 2) {
        if (res instanceof Error) {
        return res.status(500).send();
      } else if (!res) {
        res.send('')
      } else {
        res.send(res);
      }

      ackCalled = true;
    }
  };

  await slackApp.processEvent(event);
  await next();
}

module.exports = { boltHandler };