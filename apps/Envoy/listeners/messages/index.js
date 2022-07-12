const { sayHilda } = require('./say-hilda');

module.exports.register = (app) => {
    app.message('hilda', sayHilda);
};