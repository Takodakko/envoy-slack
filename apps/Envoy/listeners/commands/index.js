const { getLocation } = require('./get-location');
const { createInvite } = require('./create-invite');

module.exports.register = (app) => {
    app.command('/location', getLocation);
    app.command('/envoy-invite', createInvite);
};