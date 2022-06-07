const sayHi = async function({message, say}) {
  await say(`Hello, ${message.user}`);
};

module.exports = sayHi;