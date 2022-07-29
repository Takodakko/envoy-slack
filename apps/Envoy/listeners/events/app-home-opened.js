const { appHomeScreen } = require('../../user-interface/app-home/appHomeScreen');
const { redisClient, getAccessToken } = require('../../util/RedisClient')
const { encrypt, decrypt } = require('../../util/crypto');
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk');
const { authorizationScreen } = require('../../user-interface/app-home/authorizationScreen')

/**  
 * Event to run when app is opened to home tab.  .action listens for UI interactions like button clicks. 
 */
const appHomeOpenedCallback = async ({ client, event, body, context, payload, slackUserEmail, slackUserId, persistedClient }) => {
  try {
    // console.log("CONTEXT HAS AUTHINFO = ");
    // console.log(context.authInfo);
    // console.log("CONTEXT hasAuth = ");
    // console.log(context.hasAuthorized);
    
    let userId = payload?.user || null
    // console.log("APP HOME EMAIL: " + slackUserEmail)
    if(!slackUserEmail){
      const userInfo = await client.users.info({user: payload.user});
      slackUserEmail = userInfo.user.profile.email;
      // console.log("EXTRACTED EMAIL: " + slackUserEmail)
    }
    if(!userId){
      userId = slackUserId;
    }
    if(context.hasAuthorized){
      // const encryptedAccessToken = await getAccessToken(slackUserEmail)
      // const accessToken = decrypt(encryptedAccessToken);
      const accessToken = context.authInfo.accessToken;
      // console.log(accessToken, 'accessToken in app-home-opened');
      const envoyApi = new EnvoyAPI(accessToken);
      const locations = await envoyApi.locations()
      //console.log(locations)
      // if(!client){
      //   client = persistedClient.client
      // }
      // console.log(userId)
      await client.views.publish({
        user_id: userId, //payload.user
        view: appHomeScreen(locations)
      })
    } else {
        await _publishAuthScreen(client, slackUserEmail, payload.user);
    }
  }
  catch (error) {
      console.error(error);
  }
};

const _publishAuthScreen = async (client, slackUserEmail, slackUserId) => {
      await client.views.publish({
      user_id: slackUserId,
      view: await authorizationScreen(encrypt(slackUserEmail), encrypt(slackUserId))
  });
};

  module.exports = { appHomeOpenedCallback };