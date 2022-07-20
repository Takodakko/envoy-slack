const { appHomeScreen } = require('../../user-interface/app-home/appHomeScreen');
const { redisClient } = require('../../util/RedisClient')
const { decryptToken } = require('../../util/crypto');
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk');

/**  
 * Event to run when app is opened to home tab.  .action listens for UI interactions like button clicks. 
 */
const appHomeOpenedCallback = async ({ client, event, body, context, payload }) => {    

  const userInfo = await client.users.info({user: payload.user})
  const slackUserEmail = userInfo.user.profile.email;
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
  const envoyApi = new EnvoyAPI(accessToken);

  // const locations = context.locations; 
  const locations = await envoyApi.locations()
  console.log(locations) 
  //console.log(locations)

  try {
      const userInfo = await client.users.info({
        user: payload.user
      });

      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: await appHomeScreen(locations, slackUserEmail)
      });
  }
  catch (error) {
      console.error(error);
  }
  };

  module.exports = { appHomeOpenedCallback };