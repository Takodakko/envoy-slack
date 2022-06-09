const moment = require('moment');
//const moment = require('moment-timezone');

const viewInviteSubmitted = async function({ack, client, view, payload, body, logger}) {
  await ack();
//   console.log(view.state, 'view.state');
  const user = body.user.id;
  console.log(view.state.values, 'view.state.values');
  console.log(view.state.values.arrival_time, 'view.state.values.arrival_time');
  console.log(payload, 'payload');
  //const timezone = 'T7';
  const arrivalTime = view.state.values.arrival_date.date.selected_date + " " + view.state.values.arrival_time.time.selected_option.value;
  //const arrivalTime = moment.tz(`${view.state.values.arrival_date.date.selected_date} ${view.state.values.arrival_time.time.selected_option.value}`, 'YYYY-MM-DD h:mm a', timezone).format();
//   const inviteID = payload.id + payload.team_id + view.state.values.arrival_date.date.selected_date + view.state.values.arrival_time.time.selected_option.value.replace(/\s/g, "");
  const inviteID = payload.id + payload.team_id + moment().format();
  const guestName = view.state.values.guest_full_name.guest_full_name.value;
  const envoyInviteObject = {
    inviteId: inviteID,
    expectedArrivalAt: arrivalTime,
    invitee: {
        name: guestName
    },
    locationId: '143497'
  };
  console.log(envoyInviteObject, 'envoyInvite');
  try {
    await client.chat.postMessage({
        text: "Your invitation has been submitted!",
        channel: user
    });
  }
  catch(err) {
      console.log(err);
      logger.error(err);
  }
  
};

module.exports = viewInviteSubmitted;