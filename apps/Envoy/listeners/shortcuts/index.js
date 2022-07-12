const { createInvite } = require('./create-invite');

module.exports.register = (app) => {
    app.shortcut('envoy_invite', createInvite);
};