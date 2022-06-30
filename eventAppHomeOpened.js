const appHomeOpenedBuilder = require('./appHomeOpenedBuilder');
/**  
 * Event to run when app is opened to home tab.  .action listens for UI interactions like button clicks. 
 */
const eventAppHomeOpened = async ({client, payload, context}) => {    
    try {
    const locations = await context.envoy.API.locations();
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: (await appHomeOpenedBuilder(locations))
      });
    }
    catch (error) {
      console.error(error);
    }
  };

  module.exports = eventAppHomeOpened;