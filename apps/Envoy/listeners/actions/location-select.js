const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');
// const Envoy = require('../../../../Envoy');
/**
 * populates visitor type dropdown based on user clicking on location dropdown in invitations modal
 */

const locationSelect = async function({ack, body, context, client}) {
  await ack();
  const viewId = body.view.id;
  const viewHash = body.view.hash;
//   const envoy = Envoy.getInstance();
//   const locationsMeta = await envoy.API.locations();
const locationsMeta = context.locations;
  const locations = locationsMeta.map((locationObject) => {
    return {locationName: locationObject.attributes.name, locationId: locationObject.id};
  });
  const selectedLocationId = body.view.state.values.location.location_selected.selected_option.value;
  console.log(selectedLocationId, 'selected location id');
//   const locationFlowsMeta = await envoy.API.flows(selectedLocationId);
const locationFlowsMeta = context.flows.filter((flow) => {
    // console.log(flow, 'flow in filter');
    if (flow.locationId === selectedLocationId) {
        return flow;
    }
})
// console.log(locationFlowsMeta, 'locationFlowsMeta');
  const locationFlows = locationFlowsMeta[0].flows.map((flowObject) => {
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
      })
  }
  catch(error) {
    console.log(error);
  }
};

module.exports = { locationSelect };