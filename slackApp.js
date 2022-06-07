const { App } = require('@slack/bolt');
const { ErrorHandler } = require('@slack/bolt');
require('dotenv').config();
const eventAppHomeOpened = require('./eventAppHomeOpened');
const commandCreateInvite = require('./commandCreateInvite');
const sayHi = require('./sayHi');
const { EnvoyAPI, middleware, errorMiddleware, asyncHandler, EnvoyResponseError } = require('@envoy/envoy-integrations-sdk');
const request = require('request');
//Change to Axios

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
  console.log('add later');
}
const TOKEN_SCOPE = [
  'token.refresh', 
  'locations.read', 
  'companies.read',
  'flows.read',
  'invites.read',
  'invites.write',
  'employees.read',
  'reservations.read',
  'reservations.write',
  'work-schedules.read',
  'work-schedules.write',
].join();
let accessToken = '';
let envoyApi;
async function getAccessToken() {
  var options = {
      'method': 'POST',
      'url': 'https://api.envoy.com/oauth2/token',
      'headers': {
          'Authorization': 'Basic ' + process.env.ENVOY_CLIENT_API_KEY,
          json: true
      },
      formData: {
          'username': process.env.API_USERNAME,
          'password': process.env.API_USER_PASSWORD,
          'scope': TOKEN_SCOPE,
          'grant_type': 'password',
      }
  };
  
  request(options, function (error, response) {
      if (error) throw new Error(error);
      accessToken = JSON.parse(response.body).access_token;
      // console.log(accessToken);
      envoyApi = new EnvoyAPI(accessToken);      
  });

}

getAccessToken();



slackApp.message('hi', sayHi);

slackApp.command('/envoy-invite', commandCreateInvite);

slackApp.command('/location', async ({ack, say}) => {
  ack()
  console.log('line 34')
  const body = await envoyApi.location('143497');
  console.log(body, 'this is envoyApi');
  await say(body.id);
});

slackApp.event('app_home_opened', eventAppHomeOpened);

slackApp.shortcut('envoy_invite', commandCreateInvite);

slackApp.error(ErrorHandler);

(async () => {
  await slackApp.start(process.env.PORT);
  console.log(`running on ${process.env.PORT}`);
})();


module.exports = slackApp;