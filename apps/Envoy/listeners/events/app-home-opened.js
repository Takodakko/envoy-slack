const { appHomeScreen } = require('../../user-interface/app-home/appHomeScreen');

/**  
 * Event to run when app is opened to home tab.  .action listens for UI interactions like button clicks. 
 */
const appHomeOpenedCallback = async ({ client, event, body, context, payload }) => {    
  const locations = context.locations;
  
  try {
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const userInfo = await client.users.info({
        user: payload.user
      });

      const result = await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: await appHomeScreen(locations, userInfo.user.profile.email)
      });
  }
  catch (error) {
      console.error(error);
  }
  };

  module.exports = { appHomeOpenedCallback };