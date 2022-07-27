const { registerBuilder } = require('../../user-interface/modals');
// const Envoy = require('../../../../Envoy');

/**  
* Slash command to register to go in to the office via Envoy.
*/

const registerEmployee = async function({ack, say, context, payload, client}) {
    try {
        ack();
        const locationMeta = context.locations;
        const locations = locationMeta.map((locationObject) => {
          return {locationName: locationObject.attributes.name, locationId: locationObject.id};
        });
        // console.log('registering!');
        // const envoy = Envoy.getInstance();
        const userId = payload.user_id;
        const user = await client.users.profile.get({user: userId});
        const userEmail = user.profile.email;
        // console.log(userEmail, 'userEmail');
        const modal = registerBuilder(locations, userEmail);
        await client.views.open({
            /* the user who opened the modal */
            user_id: payload.user,
            /* the event that opened the modal is stored on both payload and body for a slash command */
            trigger_id: payload.trigger_id,
            /* the view object that makes the modal */
            view: modal,
          });
        // const now = Date.now();
        // const today = new Date(now).toISOString();
        // const yesterdayUnix = now - (24 * 60 * 60 * 1000);
        // const yesterday = new Date(yesterdayUnix).toISOString();
        
    }
    catch(error) {
        console.log(error);
    }
    
};

module.exports = { registerEmployee };