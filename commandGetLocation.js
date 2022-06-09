//const getAccessToken = require('./Envoy');
// const envoyApi = app.envoyApi;

const commandGetLocation = async function({ack, say, context}) {
    ack();
    let envoyApi = context.envoyAPI;
    console.log(envoyApi, 'the envoyAPI');
    const body = await envoyApi.location('143497');
    await say(body.id);
};

module.exports = commandGetLocation;