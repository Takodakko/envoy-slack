const getAccessToken = require('./Envoy');
// const envoyApi = app.envoyApi;

const commandGetLocation = async function({ack, say}) {
    ack();
    let envoyAPI = await getAccessToken();
    console.log(envoyAPI, 'the envoyAPI');
    const body = await envoyAPI.location('143497');
    await say(body.id);
};

module.exports = commandGetLocation;