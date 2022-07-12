const { oauthStart } = require('./oauth-start');
const { oauthCallback } = require('./oauth-callback');
//const { envoy-message-callback } = require('./envoy-message-callback');
const { validate } = require('./validate')
const { authorize } = require('./authorize')

const registerCustomRoutes = () => {
    const routes = [];
    routes.push(oauthStart);
    routes.push(oauthCallback);
    //routes.push(envoy-message-callback);
    routes.push(validate)
    routes.push(authorize)
    return routes;
};

module.exports = { registerCustomRoutes };
