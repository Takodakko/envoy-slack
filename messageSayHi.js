/**  
 * Message listener that responds to "hi".
 */

const messageSayHi = async function({message, say}) {
  await say(`Hello, your user id is ${message.user} and your team id is ${message.team}`);
};

module.exports = messageSayHi;