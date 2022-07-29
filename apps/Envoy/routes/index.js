const { oauthStart } = require('./oauth-start');
const { oauthCallback } = require('./oauth-callback');
//const { envoy-message-callback } = require('./envoy-message-callback');
const { employeeSignIn } = require('./employee-sign-in');
const { employeeSignOut } = require('./employee-sign-out');
const { visitorSignIn } = require('./visitor-sign-in');
const { installOnWorkspace } = require('./install-on-workspace');
/** Registers routes for express router for incoming data from Envoy */
const { completeSetup } = require('./envoy-setup/complete-setup')
const { authorize } = require('./envoy-setup/authorize')
const { token } = require('./envoy-setup/token');
const { selectOptionsEmojis } = require('./select-options-emojis');
const { selectOptionsHours } = require('./select-options-hours');
const { slackCredentials } = require('./envoy-setup/slack-credentials');
// const { installOnWorkspace } = require('./install-on-workspace');
const { verifyUrlForSlack } = require('./verify-url-for-slack');
// const { redirect } = require('./redirect');
const { employeeUpcoming } = require('./employee-upcoming');
const { upcomingVisit } = require('./upcoming-visit');
const { installConfirm } = require('./install_confirm');

/** Registers routes for express router for incoming data from Envoy */
const registerCustomRoutes = () => {
    const routes = [];
    routes.push(oauthStart);
    routes.push(oauthCallback);
    //routes.push(envoy-message-callback);
    routes.push(employeeSignIn);
    routes.push(employeeSignOut);
    routes.push(visitorSignIn);
    routes.push(completeSetup)
    routes.push(authorize)
    routes.push(token)
    routes.push(selectOptionsEmojis)
    routes.push(selectOptionsHours)
    routes.push(slackCredentials)
    routes.push(authorize);
    routes.push(verifyUrlForSlack);
    // routes.push(redirect);
    routes.push(employeeUpcoming);
    routes.push(upcomingVisit);
    routes.push(installConfirm);
    return routes;
};

module.exports = { registerCustomRoutes };
