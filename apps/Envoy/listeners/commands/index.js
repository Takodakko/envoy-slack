const { getLocation } = require('./get-location');
const { createInvite } = require('./create-invite');
const { checkinout } = require('./checkinout');

module.exports.register = (app) => {
    app.command('/location', getLocation);
    app.command('/envoy-invite', createInvite);
    // app.command('/envoy-checkinout', checkinout);
};