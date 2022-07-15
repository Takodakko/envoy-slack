const Envoy = require('../../../../Envoy');

/**  
* Slash command to get check in and out of the office.
*/
// Not functioning yet. Work in progress
const checkinout = async function({ack, say, context, payload, client}) {
    try {
        ack();
        const envoy = Envoy.getInstance();
        const userId = payload.user_id;
        const user = await client.users.profile.get({user: userId});
        const userEmail = user.profile.email;
        const envoywhat = await envoy.API.workSchedules({userEmails: [userEmail]});
        const workToday = envoywhat.filter((work) => {
            if (work.status === 'APPROVED' && work.expectedArrivalAt.includes('2022-07-14')) {
                return work;
            }
        })
        if (workToday.length > 0) {
            const envoythat = await envoy.API.checkInWork({id: workToday[0].id});
            console.log(envoythat, 'checkin api Envoy results')
        }
        
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