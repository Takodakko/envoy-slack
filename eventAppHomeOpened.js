const appHomeOpenedBuilder = require('./appHomeOpenedBuilder');
const Envoy = require('./Envoy');
/**  
 * Event to run when app is opened to home tab.  .action listens for UI interactions like button clicks. 
 */
const eventAppHomeOpened = async ({client, payload, say}) => {
    // console.log(client, 'client');
    try {
      const envoy = Envoy.getInstance();
    let locations = [];
    await envoy.API.locations()
      .then(res => {
        locations = res;
        console.log(res)
        console.log(locations.length);
      })

      let dropdownOptions = 
      [
        {
          "text": {
            "type": "plain_text",
            "text": locations[0].attributes.name,
            "emoji": true
          },
          "value": "value-0"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "UwU",
            "emoji": true
          },
          "value": "value-1"
        },
        {
          "text": {
            "type": "plain_text",
            "text": "*this is plain_text text*",
            "emoji": true
          },
          "value": "value-2"
        }
      ]
    
      /* view.publish is the method that your app uses to push a view to the Home tab */
      const result = await client.views.publish({
        /* the user that opened your app's app home */
        user_id: payload.user,
        /* the view object that appears in the app home*/
        view: (await appHomeOpenedBuilder().blocks[4].accessory.options.push(dropdownOptions))
      });
    }
    catch (error) {
      console.error(error);
    }
  };

  module.exports = eventAppHomeOpened;