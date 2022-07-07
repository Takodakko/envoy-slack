const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');
// const Envoy = require('../../../../Envoy');
/**  
 * Shortcut option to open invite modal.  .shortcut listens for global/message shortcuts (found in the + menu near the message bar). 
 */
const createInvite = async function({ack, client, payload, context}) {
    await ack();
    // const envoy = Envoy.getInstance();
    // const locationsMeta = await envoy.API.locations();
    const locationsMeta = context.locations;
    const locations = locationsMeta.map((locationObject) => {
      return {locationName: locationObject.attributes.name, locationId: locationObject.id};
    });
  const modal = createInviteBuilder(locations);
  try {
    const response = await client.views.open({
      /* the user who opened the modal */
      user_id: payload.user,
      /* the event that opened the modal */
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