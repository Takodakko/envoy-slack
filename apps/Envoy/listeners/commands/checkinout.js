const Envoy = require('../../../../Envoy');

/**  
* Slash command to get check in and out of the office.
*/

const checkinout = async function({ack, say, context, payload, client}) {
    try {
        ack();
        const envoy = Envoy.getInstance();
        console.log(payload, 'payload in command checkinout');
        const userId = payload.user_id;
        const user = await client.users.profile.get({user: userId});
        const userEmail = user.profile.email;
        console.log(userEmail, 'users email');
        const envoywhat = envoy.API.checkInWork();
        // const locationsMeta = context.locations;
        // const locations = locationsMeta.map((locationObject) => {
        //   return `${locationObject.attributes.name} ${locationObject.attributes.address}`;
        // });
        // const locationText = locations.length === 1 ? 'location' : 'locations';
        await say(`You've checked in / out!`);
    }
    catch(error) {
        console.log(error);
    }
    
};

module.exports = { checkinout };