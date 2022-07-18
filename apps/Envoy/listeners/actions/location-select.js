const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');
/**
 * populates visitor type dropdown based on user clicking on location dropdown in invitations modal
 */

const locationSelect = async function({ack, body, context, client}) {
  await ack();
  const viewId = body.view.id;
  const viewHash = body.view.hash;
  const locationsMeta = context.locations;
  const locations = locationsMeta.map((locationObject) => {
    return {locationName: locationObject.attributes.name, locationId: locationObject.id};
  });
  const selectedLocationId = body.view.state.values.location.location_selected.selected_option.value;
  const locationFlowsMeta = context.flows.filter((flow) => {
    if (flow.locationId === selectedLocationId) {
        return flow;
    }
})
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