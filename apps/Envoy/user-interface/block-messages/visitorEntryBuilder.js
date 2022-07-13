/**Build json blocks for visitor entry message */

const visitorEntryBuilder = function(visitorName, userData) {
  // console.log(visitorName, 'visitorName in builder');
  // console.log(userData, 'userData in builder');
  const entryBlocks = [
    {
        type: 'section',
        text: {
            type: 'plain_text',
            text: `${visitorName} is here to see you! Come say Hi! :wave:`,
            emoji: true
        }
    }
  ];
  const fieldsBlock = {
    type: 'section',
    fields: []
  }
  userData.forEach((field) => {
    const aField = {
      type: 'mrkdwn',
      text: `*${field.field}* \n ${field.value}`
    };
    fieldsBlock.fields.push(aField);
  })
  entryBlocks.push(fieldsBlock);
  return entryBlocks;
};

module.exports = { visitorEntryBuilder };