const { getLocation } = require('./get-location');

module.exports.register = (app) => {
    app.event('/location', getLocation);
};