const { getLocation } = require('./get-location');
const { createInvite } = require('./create-invite');
const { employeeCheckin } = require('./employee-checkin');
const { employeeCheckout } = require('./employee-checkout');
const { registerEmployee } = require('./register-employee');

module.exports.register = (app) => {
    app.command('/location', getLocation);
    app.command('/envoy-invite', createInvite);
    app.command('/envoy-in', employeeCheckin);
    app.command('/envoy-out', employeeCheckout);
    app.command('/register', registerEmployee);
};