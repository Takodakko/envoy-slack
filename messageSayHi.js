const messageSayHi = async function({message, say, context}) {
  console.log(context, 'context in messageSayHi');
    console.log(context.envoyAPI, 'context.envoyAPI in messageSayHi');
  await say(`Hello, your user id is ${message.user}. Your team id is ${message.team}.`);
};

module.exports = messageSayHi;