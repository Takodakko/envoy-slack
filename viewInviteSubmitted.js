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
  const locationSelected = view.state.values.location.location.selected_option.value;
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
  const envoyInviteObject = {
    invite: {
      inviteId: inviteID,
      expectedArrivalAt: arrivalTime,
      invitee: {
          name: guestName
      },
      locationId: locationSelected
    }
  };
  try {
    const invitation = await envoyApi.createInviteV1(envoyInviteObject);
    console.log(invitation, invitation.id, 'the invitation???');
    const inviteID = invitation.id;
    await client.chat.postMessage({
      text: `Your invitation for ${invitation.invitee.name} at ${rawTime} has been submitted as invitation # ${inviteID}!`,
      channel: user
  });
  }
  catch(err) {
    console.log(err);
  }
  
};

module.exports = viewInviteSubmitted;