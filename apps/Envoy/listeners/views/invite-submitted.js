const timeAdjuster = require('../../util/timeAdjuster');
const Envoy = require('../../../../Envoy');
/**  
 * Event to run when invite modal is submitted.  .view listens for modal view requests. 
 */
const inviteSubmitted = async function({ack, client, view, payload, body, context}) {
  // First check if email is properly formatted--or close enough--to avoid causing issues when sending data to Envoy. 
  // First check is because visitor email could be optional.
  if (view.state.values.visitor_email.visitor_email.value) { 
  if (!view.state.values.visitor_email.visitor_email.value.includes('@') || !view.state.values.visitor_email.visitor_email.value.includes('.')) {
    const emailError = {
      response_action: 'errors',
      errors: {
        visitor_email: 'Enter a proper email address'
      }
    };
    await ack(emailError);
  }
}
  await ack();
  const envoy = Envoy.getInstance();
  const user = body.user.id;
  // Location, flow, time, notes, and date will always be predictably available in these formats since they are not dynamically generated in the modal.
  const locationData = context.locations;
  const rawTime = view.state.values.arrival_time.time.selected_option.value;
  const timeSelected = view.state.values.arrival_time.time.selected_option.value;
  const dateSelected = view.state.values.arrival_date.date.selected_date;
  const locationSelected = view.state.values.location.location_selected.selected_option ? view.state.values.location.location_selected.selected_option.value : null;
  const flowSelected = view.state.values.visitor_type.visitor_type_selected.selected_option ? view.state.values.visitor_type.visitor_type_selected.selected_option.value : null;
  let timeZone = '';
  locationData.forEach((locationObject) => {
    if (locationObject.id === locationSelected) {
      timeZone = locationObject.attributes.timezone;
    }
  });
  const arrivalTime = timeAdjuster(dateSelected, timeSelected, timeZone);
  const now = Date.now().toString();
  const inviteID = payload.id + payload.team_id + now;
  const notes = view.state.values.notes.notes.value;
  
  // These are technically dynamically generated, but we can predict that they will be in most (all?) flows.
  const guestName = view.state.values.visitor_name.visitor_name.value;
  const guestEmail = view.state.values.visitor_email.visitor_email.value;
  
  const sendEmail = view.state.values.send_email.send_email.value === '0' ? true : false;
  // Unlike the ones above, guestPhone will go into the customFields array. 
  // It's defined here though because, due to formatting, it will look different than other custom fields.
  const guestPhone = view.state.values.visitor_phone ? view.state.values.visitor_phone.visitor_phone.value : null;


  // Fields that are dynamically generated based on the flow chosen.
  const customFields = [];
  if (guestPhone) {
    customFields.push({field: 'Your Phone Number', value: guestPhone});
  }
  const ListOfViewDataToSubmit = Object.keys(view.state.values);
  // console.log(view.state.values, 'view.state.values');
  // console.log(ListOfViewDataToSubmit, 'ListOfViewDataToSubmit');
  ListOfViewDataToSubmit.forEach((item) => {
    // console.log(item, 'item');
    // console.log(view.state.values[item][item], 'view.state.values[item][item]');
    if (item === 'host_name') {
      const itemObject = {
        field: 'Host',
        value: view.state.values.host_name.host_name.value ? view.state.values.host_name.host_name.value : ''
      }
      customFields.push(itemObject);
    }
    if (item.includes('dynamic-')) {
      let valueToSend = '';
    if (view.state.values[item][item].type === 'static_select') {
      valueToSend = view.state.values[item][item].selected_option ? view.state.values[item][item].selected_option.text.text : '';
    }
    if (view.state.values[item][item].type === 'plain_text_input') {
      valueToSend = view.state.values[item][item].value ? view.state.values[item][item].value : '';
    }
      const itemModified = item.slice(8);
      const itemObject = {
        field: itemModified,
        // value: view.state.values[item][item].selected_option ? view.state.values[item][item].selected_option.text.text : null
        value: valueToSend
      };
      customFields.push(itemObject);
    }
    
  })
  // console.log(customFields, 'customFields after pushing in data');
  // const guestName = view.state.values.guest_full_name.guest_full_name.value;
  // const guestEmail = view.state.values.guest_email.guest_email.value;
  
  const envoyInviteObject = {
    invite: {
      inviteId: inviteID,
      expectedArrivalAt: arrivalTime,
      invitee: {
          name: guestName,
          email: guestEmail
      },
      locationId: locationSelected,
      flowId: flowSelected,
      notes: notes,
      customFields: customFields,
      sendEmailToInvitee: sendEmail
    }
  };
  try {
    const invitation = await envoy.API.createInviteV1(envoyInviteObject);
    const inviteID = invitation.id;
    await client.chat.postMessage({
      text: `Your invitation for ${invitation.invitee.name} at ${rawTime} has been submitted as invitation # ${inviteID}!`,
      channel: user
  });
  }
  catch(err) {
    await client.chat.postMessage({
      text: 'There was a problem submitting your invitation.',
      channel: user
    })
    console.log(err);
  }
  
};

module.exports = { inviteSubmitted };