const { createInvite } = require('./create-invite');
const { authorizeButton } = require('./authorize-button');
const { locationSelect } = require('./location-select');
const { modalVisitorType } = require('./modal-visitor-type');

module.exports.register = (app) => {
    app.action('button_invite', createInvite);
    app.action('authorize-btn', authorizeButton);
    app.action('location_selected', locationSelect);
    app.action('visitor_type', modalVisitorType);
};