const messageSayHi = async function({message, say}) {
    // console.log(message, 'message');
  await say(`Hello, your user id is ${message.user}. Your team id is ${message.team}.`);
};

module.exports = messageSayHi;