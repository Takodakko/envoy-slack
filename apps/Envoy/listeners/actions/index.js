const { createInvite } = require('./create-invite');
const { authorizeButton } = require('./authorize-button');
const { locationSelect } = require('./location-select');

module.exports.register = (app) => {
    app.action('button_invite', createInvite);
    app.action('authorize-btn', authorizeButton);
    app.action('location_selected', locationSelect);
};