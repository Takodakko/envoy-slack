const timeAdjuster = require('./timeAdjuster');
/**  
 * Event to run when invite modal is submitted.  .view listens for modal view requests. 
 */
const viewInviteSubmitted = async function({ack, client, view, payload, body, logger, context}) {
  await ack();
  const envoyApi = context.envoy.API;
  const user = body.user.id;
  const locationData = await envoyApi.locations();
  const rawTime = view.state.values.arrival_time.time.selected_option.value;
  // console.log(rawTime, 'the raw time value selected');
  const timeSelected = view.state.values.arrival_time.time.selected_option.value;
  const dateSelected = view.state.values.arrival_date.date.selected_date;
  const locationSelected = view.state.values.location.location_selected.selected_option ? view.state.values.location.location_selected.selected_option.value : null;
  const flowSelected = view.state.values.guest_type.visitor_type.selected_option ? view.state.values.guest_type.visitor_type.selected_option.value : null;
  let timeZone = '';
  locationData.forEach((locationObject) => {
    if (locationObject.id === locationSelected) {
      timeZone = locationObject.attributes.timezone;
    }
  });
  const arrivalTime = timeAdjuster(dateSelected, timeSelected, timeZone);
  const now = Date.now().toString();
  const inviteID = payload.id + payload.team_id + now;
  
  const guestName = view.state.values.guest_full_name.guest_full_name.value;
  const guestEmail = view.state.values.guest_email.guest_email.value;
  const notes = view.state.values.notes.notes.value;
  const sendEmail = view.state.values.send_email.send_email.value === '0' ? true : false;
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
      sendEmailToInvitee: sendEmail
    }
  };
  try {
    const invitation = await envoyApi.createInviteV1(envoyInviteObject);
    const inviteID = invitation.id;
    await client.chat.postMessage({
      text: `Your invitation for ${invitation.invitee.name} at ${rawTime} has been submitted as invitation # ${inviteID}!`,
      channel: user
  });
  }
  catch(err) {
    await client.chat.postMessage({
      text: 'There was a problem submitting your invitation. Make sure to choose a location, a visitor type, and to fill in all fields NOT marked "optional"',
      channel: user
    })
    console.log(err);
  }
  
};

module.exports = viewInviteSubmitted;