const sayHi = async function({message, say}) {
  await say(`Hello, your user id is ${message.user}`);
};

module.exports = messageSayHi;