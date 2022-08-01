const timeAdjuster = require('../../util/timeAdjuster');
// const Envoy = require('../../../../Envoy');
const { EnvoyAPI } = require('@envoy/envoy-integrations-sdk');
/**  
 * Event to run when register modal is submitted.  .view listens for modal view requests. 
 */
const registerSubmitted = async function({ack, client, view, payload, body, context}) {
  ack();
  // const envoy = Envoy.getInstance().API;
  const envoy = new EnvoyAPI(context.authInfo.accessToken);
  const userEmail = payload.private_metadata;
  const user = body.user.id;
//   console.log(userEmail, 'userEmail on submission');
//   console.log(payload, 'payload');
//   console.log(view, 'view');
  const locationData = context.locations;
  const timeSelected = view.state.values.register_arrival_time.register_time.selected_option.value;
  const dateSelected = view.state.values.register_arrival_date.register_date.selected_date;
  const locationSelected = view.state.values.register_location.register_location_selected.selected_option ? view.state.values.register_location.register_location_selected.selected_option.value : null;
  let timeZone = '';
  locationData.forEach((locationObject) => {
    if (locationObject.id === locationSelected) {
      timeZone = locationObject.attributes.timezone;
    }
  });
  const arrivalTime = timeAdjuster(dateSelected, timeSelected, timeZone);
  try {
    const workSchedule = await envoy.createWorkSchedule({
        workSchedule: {
        locationId: locationSelected,
        email: userEmail,
        expectedArrivalAt: arrivalTime,
    }});
    console.log(workSchedule, 'workSchedule');
    if (workSchedule.status === 'APPROVED') {
        client.chat.postMessage({
            text: `You have been approved to come in on ${dateSelected} at ${timeSelected}. Remember to check in when you arrive!`,
            channel: user
        });
    } else if (workSchedule.status === 'PENDING') {
        client.chat.postMessage({
            text: `Your registration to come in on ${dateSelected} at ${timeSelected} is pending approval. Please click here to finish: ${workSchedule.registrationURL}`,
            channel: user
        });
    } else {
        client.chat.postMessage({
            text: `Your registration to come in on ${dateSelected} at ${timeSelected} has been denied. Please contact the appropriate person at your workplace for more details.`,
            channel: user
        });
    }
    
  }
  catch(error) {
    client.chat.postMessage({
        text: `There was an error trying to register you.`,
        channel: user
    });
    console.log(error);
  }
  



};

module.exports = { registerSubmitted };