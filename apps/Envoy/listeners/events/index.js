const { appHomeOpenedCallback } = require('./app-home-opened');
const { userStatusChanged } = require('./user-status-changed');

module.exports.register = (app) => {
    app.event('app_home_opened', appHomeOpenedCallback);
    app.event('user_status_changed', userStatusChanged);
};