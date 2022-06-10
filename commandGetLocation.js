//const getAccessToken = require('./Envoy');
// const envoyApi = app.envoyApi;
/**  
* Slash command to get the name of the user's location.
*/
const commandGetLocation = async function({ack, say, context}) {
    ack();
    let envoyApi = context.envoyAPI;
    // console.log(envoyApi, 'the envoyAPI');
    const body = await envoyApi.location('143497');
    // console.log(body, 'body');
    await say(`You are in the ${body.attributes.city} ${body.attributes.name} at ${body.attributes.address}`);
};

module.exports = commandGetLocation;