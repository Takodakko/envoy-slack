const createInviteBuilder = require('./createInviteBuilder');

const commandCreateInvite = async function({ack, client, payload, event, body}) {
    // console.log(ack, 'ack function');
    await ack();
    console.log('gonna make a modal');
    // console.log(client, 'client');
    // console.log(event.trigger_id, 'payload.trigger_id');
  const modal = createInviteBuilder();
  try {
    
    const response = await client.views.open({
      /* the event that opened the modal */
      user_id: payload.user,
      trigger_id: payload.trigger_id,
      /* the view object that makes the modal */
      view: modal
    });
    console.log(response);
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = commandCreateInvite;