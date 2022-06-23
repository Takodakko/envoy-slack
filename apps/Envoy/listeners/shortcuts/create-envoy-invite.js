'use strict';

const {
    openCreateEnvoyInviteModal
} = require('../utils/create-envoy-invite');

const createEnvoyInviteCallback = async ({
    shortcut,
    ack, 
    client, 
    context
}) => {
  //const modal = createInviteBuilder();
  try {
    await ack();
    await openCreateEnvoyInviteModal(
        shortcut.trigger_id,
        client,
        context    
    );
    // const response = await client.views.open({
    //   /* the user who opened the modal */
    //   user_id: payload.user,
    //   /* the event that opened the modal */
    //   trigger_id: payload.trigger_id,
    //   /* the view object that makes the modal */
    //   view: modal
    //});
  }
  catch (error) {
    //console.error(error);
    throw e;
  }
};

module.exports = { createEnvoyInviteCallback }

