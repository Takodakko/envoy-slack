const createInviteBuilder = require('./createInviteBuilder');
/**
 * populates visitor type dropdown based on user clicking on location dropdown in invitations modal
 */

const actionLocationSelect = async function({ack, body, context, client}) {
  await ack();
  const viewId = body.view.id;
  const viewHash = body.view.hash;
  console.log(body.view, 'body.view');
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
  try {
    await client.views.update({
        view_id: viewId,
        hash: viewHash,
        view: modal,
        // values: {
        //     location_guest_type: {
        //         visitor_type: {
        //             type: 'static_select',
        //           placeholder: {
        //             type: 'plain_text',
        //             text: 'Visitor Type'
        //           },
        //           value: null
        //         }
        //     }
        // }
      })
  }
  catch(error) {
    console.log(error);
  }
//   console.log(body, 'body when location button clicked');
//   console.log(body.view.state.values.location_guest_type.location.selected_option.text.text, 'name of location in body');
//   console.log(locationFlows, 'location flows based on location chosen');
//   console.log(selectedLocationId, 'id of location in body');
};

module.exports = actionLocationSelect;