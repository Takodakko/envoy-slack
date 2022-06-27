const createInviteBuilder = require('./createInviteBuilder');
/**  
 * Event to run when invite button on home is clicked.  .action listens for UI interactions like button clicks. 
 */
const actionCreateInvite = async function({ack, payload, client, body, context}) {
  await ack();
  const locationsMeta = await context.envoy.API.locations();
  //console.log(locationsMeta, 'locationsMeta');
  const locations = locationsMeta.map((locationObject) => {
    return {locationName: locationObject.attributes.name, locationId: locationObject.id};
  });
  const modal = createInviteBuilder(locations);
  try {
    const response = await client.views.open({
      /* the user who opened the modal */
      user_id: payload.user,
      /* the event that opened the modal is stored on body for an action */
      trigger_id: body.trigger_id,
      /* the view object that makes the modal */
      view: modal
    });
    console.log(response);
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = actionCreateInvite;