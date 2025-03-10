const moment = require('moment');
// const Envoy = require('../../../Envoy');

const employeeSignInHandler = async (req, res) => {
    try {
        // This functionality REQUIRES a user token (not a bot token) for the appropriate scope (user.profile:write)
        const webClient = req.webClientUser;
        let userEmail = req.body.payload.attributes.email;
        const location = req.envoy.body.meta.location.attributes.name;
        // console.log(req.envoy.body, 'req.envoy.body');
        // console.log(req.envoy.body.meta.location, 'req.envoy.body.meta.location');
        // console.log(req.envoy.body.payload.attributes['user-data'], 'req.envoy.body.location.payload.attributes.user-data');
        // const envoy = Envoy.getInstance().API;
        // const entry = await envoy.entry(req.envoy.body.payload.id);
        // console.log(entry, 'entry');
        // This is hardcoded now, but on installation, other numbers can be selected.
        const statusUpdateExpirationInHours = 8;
        const expiration = statusUpdateExpirationInHours ? moment().add(statusUpdateExpirationInHours, 'hours').unix() : 0;
        const userObject = await webClient.users.lookupByEmail({
            token: webClient.token,
            email: userEmail
        });
        const userId = userObject.user.id;
        webClient.users.profile.set({
            user: userId,
            profile: {
                status_text: `@ ${location} (via Envoy)`,
                status_emoji: ':office:',
                status_expiration: expiration
            }
        })
        res.status(200).send('Status updated');
    } catch (e) {
        console.error(e);
        res.writeHead(500);
        res.end('Failed to update status', 'utf-8');
    }
};
/** Change user status on Slack to in-office when they sign in on Envoy */
const employeeSignIn = {
    path: `/employee-sign-in`,
    method: ['POST'],
    handler: employeeSignInHandler
};

module.exports = { employeeSignIn };
