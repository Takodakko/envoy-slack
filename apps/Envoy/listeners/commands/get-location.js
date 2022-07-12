// const Envoy = require('../../../../Envoy');

/**  
* Slash command to get the names of the user's locations.
*/

const getLocation = async function({ack, say, context}) {
    try {
        ack();
        // const envoy = Envoy.getInstance();    
        // const body = await envoy.API.locations();
        const locationsMeta = context.locations;
        const locations = locationsMeta.map((locationObject) => {
          return `${locationObject.attributes.name} ${locationObject.attributes.address}`;
        });
        const locationText = locations.length === 1 ? 'location' : 'locations';
        await say(`Your company has the following ${locationText}: ${locations}`);
    }
    catch(error) {
        console.log(error);
    }
    
};

module.exports = { getLocation };