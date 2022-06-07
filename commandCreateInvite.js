const createInviteBuilder = require('./createInviteBuilder');

const commandCreateInvite = async function({ack, client, payload, event, body}) {
    await ack();
    // console.log(payload, 'payload');
    const userId = payload.user_id;
    let user;
    try {
        user = await client.users.info({
            user: userId
        })
    }
    catch(err) {
        console.log(err);
    }
  const modal = createInviteBuilder();
  const userEmail = user.user.profile.email;
//   console.log(user.user.profile.email, 'user');
  try {
    const response = await client.views.open({
      /* the user who opened the modal */
      user_id: payload.user,
      /* the event that opened the modal */
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