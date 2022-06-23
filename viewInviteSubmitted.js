// const moment = require('moment');
const timeAdjuster = require('./timeAdjuster');
/**  
 * Event to run when invite modal is submitted.  .view listens for modal view requests. 
 */
const viewInviteSubmitted = async function({ack, client, view, payload, body, logger, context}) {
  await ack();
  const envoyApi = context.envoy.API;
  const user = body.user.id;
  const locationData = await envoyApi.locations();
  // console.log(locationData, 'locationData');
  const timeZone = locationData[0].attributes.timezone;
  // console.log(timeZone, 'the time zone');
  const rawTime = view.state.values.arrival_time.time.selected_option.value;
  // console.log(rawTime, 'the raw time value selected');
  // console.log(rawTime.length, 'length of time value');
  // const timeSelected = view.state.values.arrival_time.time.selected_option.value.slice(0, -3);
  const timeSelected = view.state.values.arrival_time.time.selected_option.value;
  const dateSelected = view.state.values.arrival_date.date.selected_date;
  //const arrivalTime = view.state.values.arrival_date.date.selected_date + "T" + timeSelected + ":00Z";
  const arrivalTime = timeAdjuster(dateSelected, timeSelected, timeZone);
  console.log(arrivalTime, 'arrivalTime');
  // const date = new Date();
  const now = Date.now().toString();
  // const inviteID = payload.id + payload.team_id + view.state.values.arrival_date.date.selected_date + view.state.values.arrival_time.time.selected_option.value.replace(/\s/g, "");
  const inviteID = payload.id + payload.team_id + now;
  
  const guestName = view.state.values.guest_full_name.guest_full_name.value;
  const envoyInviteObject = {
    invite: {
      inviteId: inviteID,
      expectedArrivalAt: arrivalTime,
      invitee: {
          name: guestName
      },
      locationId: '143497'
    }
  };
  try {
    const invitation = await envoyApi.createInviteV1(envoyInviteObject);
    console.log(invitation, invitation.id, 'the invitation???');
    const inviteID = invitation.id;
    await client.chat.postMessage({
      text: `Your invitation for ${invitation.invitee.name} has been submitted as invitation # ${inviteID}!`,
      channel: user
  });
  }
  catch(err) {
    console.log(err);
  }
  
};

module.exports = viewInviteSubmitted;