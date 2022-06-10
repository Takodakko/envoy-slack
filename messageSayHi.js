/**  
 * Test message to interact with app via messages.  .message listens for specific text entered into the message bar. 
 */
const messageSayHi = async function({message, say, context}) {
  // console.log(locations, 'locations');
  // console.log(context.envoyAPI, 'context.envoyAPI in messageSayHi');
  // console.log(context.envoyAPI.token, 'context.envoyAPI.token in messageSayHi');
  // envoyAPIInstance = context.envoyAPI.getAccessToken();
  // console.log(envoyAPIInstance, 'envoyApi instance');
  // console.log(envoyAPIInstance.token, 'envoyApi instance');
  await say(`Hello, your user id is ${message.user}. Your team id is ${message.team}.`);
};

module.exports = messageSayHi;