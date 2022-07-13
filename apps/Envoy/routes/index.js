const { oauthStart } = require('./oauth-start');
const { oauthCallback } = require('./oauth-callback');
//const { envoy-message-callback } = require('./envoy-message-callback');
const { employeeSignIn } = require('./employee-sign-in');
const { employeeSignOut } = require('./employee-sign-out');
const { visitorSignIn } = require('./visitor-sign-in');
const { installOnWorkspace } = require('./install-on-workspace');
/** Registers routes for express router for incoming data from Envoy */
const { validate } = require('./validate')
const { authorize } = require('./authorize')

const registerCustomRoutes = () => {
    const routes = [];
    routes.push(oauthStart);
    routes.push(oauthCallback);
    //routes.push(envoy-message-callback);
    routes.push(employeeSignIn);
    routes.push(employeeSignOut);
    routes.push(visitorSignIn);
    routes.push(validate)
    routes.push(authorize)
    return routes;
};

module.exports = { registerCustomRoutes };
