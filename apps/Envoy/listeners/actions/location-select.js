const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');
const Envoy = require('../../../../Envoy');
/**
 * populates visitor type dropdown based on user clicking on location dropdown in invitations modal
 */

const locationSelect = async function({ack, body, context, client}) {
  await ack();
  console.log("\n")
  console.log(context.locations)
  console.log("\n")
  console.log(context)
  console.log("\n")
  const viewId = body.view.id;
  const viewHash = body.view.hash;
  const locationsMeta = context.locations;
  // console.log(locationsMeta, 'locationsMeta');
  // console.log(context.flows[1].flows, 'context.flows');
  const envoy = Envoy.getInstance();
  // const aFlow = await envoy.API.flows('170529');
  // console.log(aFlow, 'aFlow');
  // console.log(aFlow[0].relationships['sign-in-field-page'], 'signin field page');
  // console.log(aFlow[0].relationships['sign-in-field-action-rule-groups'], 'sign-in-field-action-rule-groups');
  // const flowEnt = await envoy.API.flow('346982');
  // console.log(flowEnt, 'flowEnt');
  // console.log(flowEnt.relationships['sign-in-field-page'], 'sign in field page');
  // console.log(flows[0].relationships['sign-in-field-page'], 'sign in page');
  // const page = await envoy.API.signInPage('346378');
  // console.log(page, 'page');
  // console.log(page.relationships['actionable-sign-in-field-actions'], 'actionable-sign-in-field-actions');
  // console.log(page.relationships['actionable-sign-in-fields'], 'actionable-sign-in-fields');
  // console.log(page.relationships['sign-in-field-actions'], 'sign-in-field-actions');
  // console.log(page.relationships['sign-in-fields'], 'sign-in-fields');
  // console.log(page.relationships['sign-in-fields'].data, 'sign-in-fields.data');
  // const page = await envoy.API.flowBadge('346982');
  // console.log(page, 'page');

  // Added in custom API to make this work. Took it from the previous version of this code. It's under this getSignInFields method.
  // const whatThis = await envoy.API.getSignInFields('346982');
  // console.log(whatThis, 'whatThis');
  
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
