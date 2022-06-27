const createInviteBuilder = require('./createInviteBuilder');
/**
 * responds to user clicking on location dropdown in invitations modal
 */

const actionLocationSelect = async function({ack, body, context, client}) {
  await ack();
  const viewId = body.view.id;
//   console.log(viewId, 'viewId');
  const locationsMeta = await context.envoy.API.locations();
  const locations = locationsMeta.map((locationObject) => {
    return {locationName: locationObject.attributes.name, locationId: locationObject.id};
  });
  const selectedLocationId = body.view.state.values.location_guest_type.location.selected_option.value;
//   const selectedLocation = await context.envoy.API.location(selectedLocationId);
//   console.log(selectedLocation, 'selectedLocation');
  const locationFlowsMeta = await context.envoy.API.flows(selectedLocationId);
  const locationFlows = locationFlowsMeta.map((flowObject) => {
    return ({
        text: {
          type: "plain_text",
          text: `${flowObject.attributes.name}`,
          emoji: true
      },
      value: `${flowObject.id}`
      })
  });
  const modal = createInviteBuilder(locations, locationFlows);
  await client.views.update({
    view_id: viewId,
    view: modal
  })
//   console.log(body, 'body when location button clicked');
//   console.log(body.view.state.values.location_guest_type.location.selected_option.text.text, 'name of location in body');
//   console.log(locationFlows, 'location flows based on location chosen');
//   console.log(selectedLocationId, 'id of location in body');
};

module.exports = actionLocationSelect;