const createInviteBuilder = require('./createInviteBuilder');
/**  
 * Slash command to open invite modal.  .command listens for slash commands entered into the message bar. 
 */
const commandCreateInvite = async function({ack, client, payload, context}) {
    ack();
    // console.log(body, 'body');
    const locations = await context.envoyAPI.locations();
    const locationSelections = locations.map((locationObject, ind) => {
      const oneLocation = {
        "text": {
          "type": "plain_text",
          "text": locationObject.attributes.name,
          "emoji": true
      },
      "value": `value-${ind}`
      }
      return oneLocation;
    });
    console.log(locationSelections, 'locationSelections');
    const userId = payload.user_id;
    let user;
    try {
        user = await client.users.info({
            user: userId
        })
    
    // console.log(locations, 'locations in commandCreateInvite');
  // const modal = createInviteBuilder(locations);
  // const userEmail = user.user.profile.email;
//   console.log(user.user.profile.email, 'user');
  
    console.log(locationSelections, 'locationSelections');
    // const modal = createInviteBuilder(locations);
    const response = await client.views.open({
      /* the user who opened the modal */
      user_id: payload.user,
      /* the event that opened the modal is stored on both payload and body for a slash command */
      trigger_id: payload.trigger_id,
      /* the view object that makes the modal */
      view: createInviteBuilder(locations)
    });
    console.log(response);
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = commandCreateInvite;