/**
 * Responder to a click on the authorize button. Sends ack() and does nothing else.
 */

const authorizeButton = async function({ack, context}) {
  await ack();
};

module.exports = { authorizeButton };