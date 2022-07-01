const { oauthStart } = require('./oauth-start');
const { oauthCallback } = require('./oauth-callback');
//const { envoy-message-callback } = require('./envoy-message-callback');

const registerCustomRoutes = () => {
    const routes = [];
    routes.push(oauthStart);
    routes.push(oauthCallback);
    //routes.push(envoy-message-callback);
    return routes;
};

module.exports = { registerCustomRoutes };
