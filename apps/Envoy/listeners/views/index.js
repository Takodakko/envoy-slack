const { inviteSubmitted } = require('./invite-submitted');
const { registerSubmitted } = require('./register-submitted');

module.exports.register = (app) => {
    app.view('invite_modal', inviteSubmitted);
    app.view('register_modal', registerSubmitted);
};