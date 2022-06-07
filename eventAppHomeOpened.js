const appHomeOpenedBuilder = require('./appHomeOpenedBuilder');

const eventAppHomeOpened = async ({client, payload, say}) => {
    console.log(client, 'client');
    try {
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: appHomeOpenedBuilder()
      });
    }
    catch (error) {
      console.error(error);
    }
  };

  module.exports = eventAppHomeOpened;