/**  
* Slash command to get the names of the user's locations.
*/
const commandGetLocation = async function({ack, say, context}) {
    ack();
    let envoyApi = context.envoy.API;
    
    const body = await envoyApi.locations();
    
    const locations = body.map((locationObject) => {
      return `${locationObject.attributes.name} ${locationObject.attributes.address}`;
    });
    await say(`Your company has the following locations: ${locations}`);
};

module.exports = commandGetLocation;