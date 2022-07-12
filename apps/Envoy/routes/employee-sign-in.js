const moment = require('moment');
/** Change user status on Slack to in-office when they sign in on Envoy */
const employeeSignInHandler = async (req, res) => {
    try {
        // console.log(req.webClient, 'req.webClient');
        // console.log(req.envoy, 'req.envoy');
        // console.log(req.envoy.body.meta.location, 'req.envoy.body.meta.location');
        // console.log(webClient, 'the web client');
        // console.log(req.envoy.installStorage, 'install storage');
        const webClient = req.webClientUser;
        let userEmail = req.body.payload.attributes.email;
        const location = req.envoy.body.meta.location.attributes.name;
        const statusUpdateExpirationInHours = 8;
        const expiration = statusUpdateExpirationInHours ? moment().add(statusUpdateExpirationInHours, 'hours').unix() : 0;
        // console.log(expiration, 'expiration');
        // console.log(location.data.id);
        if (userEmail.includes('+sdk')) {
            const start = userEmail.indexOf('+');
            userEmail = userEmail.slice(0, start) + userEmail.slice(start + 4);
            // console.log(userEmail, 'userEmail if if');
        }
        const userObject = await webClient.users.lookupByEmail({
            token: webClient.token,
            email: userEmail
        });
        const userId = userObject.user.id;
        // console.log(userObject, 'userObject');
        // boltHandler(event);
        // webClient.users.profile.get()
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

const employeeSignIn = {
    path: `/employee-sign-in`,
    method: ['POST'],
    handler: employeeSignInHandler
};

module.exports = { employeeSignIn };
