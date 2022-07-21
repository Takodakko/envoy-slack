const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');
/**  
 * Event to run when invite button on home is clicked.  .action listens for UI interactions like button clicks. 
 */
const createInvite = async function({ack, payload, client, body, context}) {
  await ack();
  const triggerId = body.trigger_id;
  const locationsMeta = context.locations;
  const locations = locationsMeta.map((locationObject) => {
    return {locationName: locationObject.attributes.name, locationId: locationObject.id};
  });
  
  const modal = createInviteBuilder(locations);
  try {
    const response = await client.views.open({
      /* the user who opened the modal */
      user_id: payload.user,
      /* the event that opened the modal is stored on body for an action */
      trigger_id: triggerId,
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