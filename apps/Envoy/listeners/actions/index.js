const { createInvite } = require('./create-invite');
const { authorizeButton } = require('./authorize-button');

module.exports.register = (app) => {
    app.action('button-invite', createInvite);
    app.action('authorize-btn', authorizeButton);
};