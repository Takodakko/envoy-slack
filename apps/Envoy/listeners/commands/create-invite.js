const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');
/**  
 * Slash command to open invite modal.  .command listens for slash commands entered into the message bar. 
 */
 const createInvite = async function({ack, client, payload, context}) {
    await ack();
    const locationMeta = context.locations;
    const locations = locationMeta.map((locationObject) => {
      return {locationName: locationObject.attributes.name, locationId: locationObject.id};
    });
    const modal = createInviteBuilder(locations);
    
    const userId = payload.user_id;
    let user;
    try {
        user = await client.users.info({
            user: userId
        })
    
    const response = await client.views.open({
      /* the user who opened the modal */
      user_id: payload.user,
      /* the event that opened the modal is stored on both payload and body for a slash command */
      trigger_id: payload.trigger_id,
      /* the view object that makes the modal */
      view: modal
    });
    console.log(response);
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = { createInvite };