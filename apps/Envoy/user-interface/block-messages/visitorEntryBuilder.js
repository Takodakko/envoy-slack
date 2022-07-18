/**Build json blocks for visitor entry message */

const visitorEntryBuilder = function(visitorName, userData, photoToUse, locationName) {
  
  const entryBlocks = [
    {
        type: 'section',
        text: {
            type: 'plain_text',
            text: `${visitorName} is here to see you at ${locationName}! Come say Hi! :wave:`,
            emoji: true
        }
    }
  ];
  if (photoToUse !== null) {
    const photoBlock = {
      type: "image",
      image_url: photoToUse,
      alt_text: "visitor"
    };
    entryBlocks[0].accessory = photoBlock;
  };
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