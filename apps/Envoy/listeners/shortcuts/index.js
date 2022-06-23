'use strict';

const { createEnvoyInviteCallback } = require('./create-envoy-invite');

module.exports.register = (app) => {
    app.shortcut('create-envoy-invite', createEnvoyInviteCallback);
};
