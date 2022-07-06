/**  
 * Message listener that responds to "hilda".
 */

 const sayHilda = async function({message, say}) {
    await say(`HILDA HILDA HILDA -- Hello, your user id is ${message.user} and your team id is ${message.team} -- HILDA HILDA HILDA`);
  };
  
  module.exports = { sayHilda };