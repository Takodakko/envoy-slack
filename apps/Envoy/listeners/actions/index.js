const { createInvite } = require('./create-invite');
const { authorizeButton } = require('./authorize-button');
const { locationSelect } = require('./location-select');
const { modalVisitorType } = require('./modal-visitor-type');
const { registerForOffice } = require('./register-for-office');

module.exports.register = (app) => {
    app.action('button_invite', createInvite);
    app.action('authorize-btn', authorizeButton);
    app.action('location_selected', locationSelect);
    app.action('visitor_type_selected', modalVisitorType);
    app.action('button_register', registerForOffice);
};