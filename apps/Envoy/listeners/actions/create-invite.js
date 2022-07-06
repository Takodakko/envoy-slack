const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');
const Envoy = require('../../../../Envoy');
/**  
 * Event to run when invite button on home is clicked.  .action listens for UI interactions like button clicks. 
 */
const createInvite = async function({ack, payload, client, body}) {
  await ack();
  const envoy = Envoy.getInstance();
  const locationsMeta = await envoy.API.locations();
  // const flowsMeta = [];
  const locations = locationsMeta.map((locationObject) => {
    return {locationName: locationObject.attributes.name, locationId: locationObject.id};
  });
  // for (let i = 0; i < locationsAndFlows.length; i++) {
  //   const flowsMeta = [];
  //   const locationFlows = await context.envoy.API.flows(locationsAndFlows[i].locationId);
  //   flowsMeta.push(...locationFlows)
  //   locationsAndFlows[i].flows = flowsMeta;
  // }
  // console.log(locationsAndFlows, 'locations');
  // console.log(locationsAndFlows[0].flows, 'flows array');
  // const flows = flowsMeta.map((flowObject) => {
  //   return flowObject.attributes.name;
  // });
  // console.log(flows, 'flows');
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

module.exports = { createInvite };