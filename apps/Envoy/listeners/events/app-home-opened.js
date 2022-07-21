const { appHomeScreen } = require('../../user-interface/app-home/appHomeScreen');
const { redisClient } = require('../../util/RedisClient')
const { decryptToken } = require('../../util/crypto');
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk');
const Envoy = require('../../../../Envoy');

/**  
 * Event to run when app is opened to home tab.  .action listens for UI interactions like button clicks. 
 */
const appHomeOpenedCallback = async ({ client, event, body, context, payload }) => {    

  const userInfo = await client.users.info({user: payload.user})
  const slackUserEmail = userInfo.user.profile.email;
  // console.log(slackUserEmail, 'slackUserEmail');
  function hExistsPromise() {
    return new Promise((resolve, reject) => {
      redisClient.HEXISTS(slackUserEmail, 'refreshToken', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  // hExistsPromise returns 0 if no user is found.
  let sessionExists = await hExistsPromise(); 
  
  
  // User is not yet authenticated with Envoy
  if (sessionExists === 0) {
    const isAuthed = false;
    try {
      /* view.publish is the method that your app uses to push a view to the Home tab */
      await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: appHomeScreen([], slackUserEmail, isAuthed)
      });
  }
  catch (error) {
      console.error(error);
  }
  }
  // User is already authenticated with Envoy
  const isAuthed = true;
  function hGetAccessTokenPromise() {
    return new Promise((resolve, reject) => {
      redisClient.hGet(slackUserEmail, 'accessToken', (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
  const encryptedAccessToken = await hGetAccessTokenPromise(slackUserEmail)
  const accessToken = decryptToken(encryptedAccessToken);  
  console.log(accessToken, 'accessToken');
  
  const envoyApi = new EnvoyAPI(accessToken);
  // const envoyApi = Envoy.getInstance().API;

  // const locations = context.locations; 
  const locations = await envoyApi.locations()
  // console.log(locations);

  try {

      /* view.publish is the method that your app uses to push a view to the Home tab */
      await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: appHomeScreen(locations, slackUserEmail, isAuthed)
      });
  }
  catch (error) {
      console.error(error);
  }
  };

  module.exports = { appHomeOpenedCallback };