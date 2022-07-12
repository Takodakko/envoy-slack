const { inviteSubmitted } = require('./invite-submitted');

module.exports.register = (app) => {
    app.view('invite_modal', inviteSubmitted);
};