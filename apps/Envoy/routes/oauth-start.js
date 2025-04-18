const { decrypt, encrypt } = require('../util/crypto')
// Defining this route as a ExpressReceiver route as we need a param passed in

const startOAuthProcess = async (req, res) => {
    try {
        // Store slackUserId in session
        req.session.slackUserEmail = req.params.slackUserEmail;
        req.session.slackUserId = req.params.slackUserId;
        // Send success message
        console.log('redirecting to: ' + _buildOAuthURL());
        res.redirect(307, _buildOAuthURL()); // Using 307 response code to prevent browser from caching the redirection
        res.end('OAuth flow correctly started');
    } catch (e) {
        console.error(e);
        // res.writeHead(500);
        res.end('Failed to start OAuth flow', 'utf-8');
    }
};

// Returns OAuth URL to start Web based OAuth 2.0 flow
const _buildOAuthURL = () => {
    let auth_url = `${process.env.ENVOY_BASE_URL}/a/auth/v0/authorize`;
    auth_url += `?response_type=code&client_id=${process.env.ENVOY_CLIENT_ID}`;
    auth_url += `&redirect_uri=${process.env.NGROK_URL}/oauthcallback&scope=locations.read+token.refresh+flows.read+work-schedules.read+work-schedules.write+invites.read+invites.write+employees.read+reservations.read+reservations.write+sign-in-fields.read+sign-in-fields.write+sign-in-field-pages.read+badges.read`;
    return auth_url;
};

const oauthStart = {
    path: '/oauthstart/:slackUserEmail&:slackUserId', //dont forget to encrypt
    method: ['GET'],
    handler: startOAuthProcess
};

module.exports = { oauthStart };
