const { appHomeScreen } = require('../../user-interface/app-home/appHomeScreen');
// const Envoy = require('../../../../Envoy');
/**  
 * Event to run when app is opened to home tab.  .action listens for UI interactions like button clicks. 
 */
const appHomeOpenedCallback = async ({ client, event, body, context, payload }) => {    
  // console.log(client, 'client');
  // const channels = await client.users.conversations({team_id: client.teamId});
  // console.log(channels, 'channels');
  // const envoy = Envoy.getInstance();
  // const locations = await envoy.API.locations();
  const locations = context.locations;
  // console.log(locations);
  try {
    //console.log(payload.user)
    // const locations = [{ attributes: { name: "HQ"}},{ attributes: { name: "NYC"}}] //await context.envoy.API.locations();
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: await appHomeScreen(locations, payload.user)
      });
  }
  catch (error) {
      console.error(error);
  }
  };

  module.exports = { appHomeOpenedCallback };