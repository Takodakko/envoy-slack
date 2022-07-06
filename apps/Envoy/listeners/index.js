const shortcutsListener = require('./shortcuts');
const eventsListener = require('./events');
const actionListener = require('./actions');
const viewsListener = require('./views');
const messagesListener = require('./messages');
const commandsListener = require('./commands');

module.exports.registerListeners = (app) => {
    //shortcutsListener.register(app);
    eventsListener.register(app);
    actionListener.register(app);
    //viewsListener.register(app);
    messagesListener.register(app);
    commandsListener.register(app);
};