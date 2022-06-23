const createInviteBuilder = require('../../used/createInviteBuilder');

const actionCreateInvite = async function({ack, payload, client, body}) {
  await ack();
  // console.log(client, 'client');
  // console.log(body, 'body');
  const modal = createInviteBuilder();
  try {
    const response = await client.views.open({
      /* the user who opened the modal */
      user_id: payload.user,
      /* the event that opened the modal is stored on body for an action */
      trigger_id: body.trigger_id,
      /* the view object that makes the modal */
      view: modal
    });
    console.log(response);
  }
  catch (error) {
    console.error(error);
  }
};

module.exports = actionCreateInvite;