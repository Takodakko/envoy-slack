const Envoy = require('../../../../Envoy');
const { createInviteBuilder } = require('../../user-interface/modals/createInviteBuilder');

/** Acknowledges visitor type chosen */

const modalVisitorType = async function({ack, body, context, client}) {
    await ack();
    const viewId = body.view.id;
    const viewHash = body.view.hash;
    const locationsMeta = context.locations;
    const envoy = Envoy.getInstance();
    const locations = locationsMeta.map((locationObject) => {
      return {locationName: locationObject.attributes.name, locationId: locationObject.id};
    });
    const selectedFlowId = body.view.state.values.visitor_type.visitor_type_selected.selected_option.value;
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
    // Added in custom API to make this work. Took it from the previous version of this code. It's under this getSignInFields method.
  const fieldsMeta = await envoy.API.getSignInFields(selectedFlowId);
  // console.log(fieldsMeta, 'fieldsMeta');
  const fields = fieldsMeta.map((field) => {
    const fieldObject = {
      id: field.id,
      identifier: field.attributes.identifier,
      kind: field.attributes.kind,
      name: field.attributes.name,
      required: field.attributes.required,
      position: field.attributes.position,
      options: field.attributes.options.length ? field.attributes.options : [],
    }
    return fieldObject;
  });
  const modal = createInviteBuilder(locations, locationFlows, fields);
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

  module.exports = { modalVisitorType };

  // This is the custom API mentioned above.
// async getSignInFields(flowId) {
//   const { included } = await this.request({
//     url: `/api/v3/flows/${flowId}/sign-in-field-page`,
//     qs: {
//       include: 'sign-in-fields',
//     },
//   });
//   return included;
// }