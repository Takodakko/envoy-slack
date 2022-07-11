/**  
 * Message listener that responds to "hilda".
 */

 const sayHilda = async function({message, say}) {
    await say(`-- Hello, your user id is ${message.user} and your team id is ${message.team} --`);
  };
  
  module.exports = { sayHilda };