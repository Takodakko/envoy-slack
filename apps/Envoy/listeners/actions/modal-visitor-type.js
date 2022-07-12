/** Acknowledges visitor type chosen */

const modalVisitorType = async function({ack}) {
    await ack();
    console.log('visitor type button clicked');
  };

  module.exports = { modalVisitorType };